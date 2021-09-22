import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  AuBankAccountElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useApolloClient, useMutation, useReactiveVar } from "@apollo/client";
import {
  CHARGE_CUSTOMER,
  CREATE_PAYMENT_INTENT,
} from "graphql/mutations/payment";
import { GET_CART_BY_USER } from "graphql/queries/payment";
import { userVar } from "graphql/reactiveVar";
import { GET_ME } from "graphql/queries";

import styles from "./styles.module.scss";
import { Button, Input, Checkbox } from "components";

const stripePromise = loadStripe(
  "pk_test_51JS7gUGBlycH6PilyV886bSYmq6uMdeX0Kg6SnQjTPT4fMWsZmT3SrfwiBAjBCU3QRV8PIw4EwZtg4obaIWMyGwv00i9OFvLEd"
);

const AuBecsDebitPayment = (props) => {
  const { id } = useReactiveVar(userVar);
  const client = useApolloClient();
  const [intent, setIntent] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [stripeId, setStripeId] = useState("");
  const [chargeCustomer] = useMutation(CHARGE_CUSTOMER, {
    onError: (err) => console.log(JSON.stringify(err, 0, 2)),
  });
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT, {
    onError: (err) => console.log(JSON.stringify(err, 0, 2)),
  });

  const updateStripeIdFromServer = async () => {
    const stripeIdResponse = await client.query({
      query: GET_ME,
      fetchPolicy: "network-only",
    });
    console.log({ stripeIdResponse });
    setStripeId(stripeIdResponse.data.me.stripeId);
  };

  const paymentIntentHandler = async () => {
    const { id } = userVar();
    const res = await client.query({
      query: GET_CART_BY_USER,
      variables: { id },
    });
    const orderIdArray = res.data.getCartByUser;
    const orderId = orderIdArray[orderIdArray.length - 1].orderId;
    console.log({ orderId });
    const paymentIntentResponse = await createPaymentIntent({
      variables: {
        method: "direct_debit",
        stripeUserId: stripeId,
        saveInfo: saveInfo,
        input: {
          userId: id,
          orderId: orderId,
        },
      },
    });
    // If stripdId exist, graph setupIntent, else grab paymentIntent + clientSecret
    const {
      data: {
        createPaymentIntent: { transactionDetails, paymentStatus },
      },
    } = paymentIntentResponse;
    setIntent(stripeId ? transactionDetails : paymentStatus);
    console.table({ stripeId, transactionDetails, paymentStatus });
    console.table(paymentIntentResponse.data.createPaymentIntent);
  };

  const chargeCustomerHandler = async () => {
    console.log({ stripeId });
    const res = await client.query({
      query: GET_CART_BY_USER,
      variables: { id },
    });
    const orderIdArray = res.data.getCartByUser;
    const orderId = orderIdArray[orderIdArray.length - 1].orderId;
    console.log({ stripeId, orderId, intent });
    console.log(`Payment intent: ${intent}`);
    const chargeCustomerResponse = await chargeCustomer({
      variables: {
        method: "direct_debit",
        intent: intent,
        input: {
          userId: id,
          orderId: orderId,
          stripeId: stripeId,
        },
      },
    });
    console.log({ chargeCustomerResponse });
  };

  return (
    <Elements stripe={stripePromise}>
      <div>
        <h2>Debit</h2>
        <div className={styles.flex}>
          <Checkbox onClick={() => setSaveInfo(!saveInfo)} value={saveInfo} />
          <p className={styles.text}>Save information?</p>
          <Button size="small" onClick={() => paymentIntentHandler()}>
            Create Intent
          </Button>
          <Button size="small" onClick={() => chargeCustomerHandler()}>
            Charge existing customer
          </Button>
          <Button size="small" onClick={() => updateStripeIdFromServer()}>
            Refresh StripeId Intent
          </Button>
        </div>
        <Input
          placeholder="STRIPE ID"
          value={stripeId}
          onChange={() => setStripeId(stripeId)}
        />
        <CheckoutForm intent={intent} />
      </div>
    </Elements>
  );
};

export default AuBecsDebitPayment;

const CheckoutForm = ({ intent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ intent });
    if (!stripe || !elements || !intent) {
      return;
    }

    const auBankAccount = elements.getElement(AuBankAccountElement);
    const accountholderName = event.target["accountholder-name"];
    const email = event.target.email;
    let result;

    // check if intent is set up or payment
    // https://stripe.com/docs/payments/au-becs-debit
    if (intent.substring(0, 4) === "seti") {
      result = await stripe.confirmAuBecsDebitSetup(intent, {
        payment_method: {
          au_becs_debit: auBankAccount,
          billing_details: {
            name: accountholderName.value,
            email: email.value,
          },
        },
      });
    } else if (intent.substring(0, 2) === "pi") {
      result = await stripe.confirmAuBecsDebitPayment(intent, {
        payment_method: {
          au_becs_debit: auBankAccount,
          billing_details: {
            name: accountholderName.value,
            email: email.value,
          },
        },
      });
    }

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      console.log("Payment successful");
      // Show a confirmation message to your customer.
      // The PaymentIntent is in the 'processing' state.
      // BECS Direct Debit is a delayed notification payment
      // method, so funds are not immediately available.
    }
  };

  return <BecsForm onSubmit={handleSubmit} disabled={!stripe} />;
};

const BecsForm = ({ onSubmit, disabled }) => {
  const AU_BANK_ACCOUNT_STYLE = {
    base: {
      color: "#7116DB",
      fontSize: "14px",
      "::placeholder": {
        color: "#333",
      },
      ":-webkit-autofill": {
        color: "#7116DB",
      },
    },
    invalid: {
      color: "#ec5a24",
      iconColor: "#ec5a24",
      ":-webkit-autofill": {
        color: "#ec5a24",
      },
    },
  };

  const AU_BANK_ACCOUNT_ELEMENT_OPTIONS = {
    style: AU_BANK_ACCOUNT_STYLE,
    disabled: false,
    hideIcon: false,
    iconStyle: "default", // or "solid"
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>
            Name
            <Input
              name="accountholder-name"
              placeholder="John Smith"
              required
            />
          </label>
        </div>

        <div className="col">
          <label className={styles.label}>
            Email Address
            <Input
              name="email"
              type="email"
              placeholder="john.smith@example.com"
              required
            />
          </label>
        </div>
      </div>

      <div className={styles.bankAccount}>
        <label className={styles.label}>
          Bank Account
          <AuBankAccountElement options={AU_BANK_ACCOUNT_ELEMENT_OPTIONS} />
        </label>
      </div>

      {/* Display mandate acceptance text. */}
      <div className={styles.text}>
        By providing your bank account details and confirming this payment, you
        agree to this Direct Debit Request and the{" "}
        <a href="https://stripe.com/au-becs-dd-service-agreement/legal">
          Direct Debit Request service agreement
        </a>
        , and authorise Stripe Payments Australia Pty Ltd ACN 160 180 343 Direct
        Debit User ID number 507156 (“Stripe”) to debit your account through the
        Bulk Electronic Clearing System (BECS) on behalf of Rocket Rides (the
        "Merchant") for any amounts separately communicated to you by the
        Merchant. You certify that you are either an account holder or an
        authorised signatory on the account listed above.
      </div>

      <Button
        className={styles.button}
        size="small"
        type="submit"
        disabled={disabled}
      >
        Confirm Payment
      </Button>
    </form>
  );
};
