import styles from "./styles.module.scss";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Checkbox} from "components";
import { useEffect, useState } from "react";
import { useApolloClient, useMutation, useReactiveVar } from "@apollo/client";
import { CHARGE_CUSTOMER, CREATE_PAYMENT_INTENT } from "graphql/mutations/payment";
import { GET_CART_BY_USER } from "graphql/queries/payment";
import { GET_ME } from "graphql/queries";

import { userVar } from "graphql/reactiveVar";

const stripePromise = loadStripe(
  "pk_test_51JS7gUGBlycH6PilyV886bSYmq6uMdeX0Kg6SnQjTPT4fMWsZmT3SrfwiBAjBCU3QRV8PIw4EwZtg4obaIWMyGwv00i9OFvLEd"
);
const CreditCardPayment = () => {
  const client = useApolloClient();
	const { id } = useReactiveVar(userVar);

	const [stripeId, setStripeId] = useState("")
  const [paymentIntent, setPaymentIntent] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
	const [chargeCustomer] = useMutation(CHARGE_CUSTOMER,  {
    onError: (err) => console.log(JSON.stringify(err, 0, 2)),
  });

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT, {
    onError: (err) => console.log(JSON.stringify(err, 0, 2)),
  });

	const updateStripeIdFromServer = async () => {
		const stripeIdResponse = await client.query({ 
			query: GET_ME, 
			fetchPolicy: 'network-only'
		})
		console.log({ stripeIdResponse })
		setStripeId(stripeIdResponse.data.me.stripeId)
	}

  const paymentIntentHandler = async () => {
    const res = await client.query({
      query: GET_CART_BY_USER,
      variables: { id },
    });
    const orderIdArray = res.data.getCartByUser;
		console.log({ orderIdArray, res, id})
    const orderId = orderIdArray[orderIdArray.length - 1].orderId;
    const paymentIntentResponse = await createPaymentIntent({
      variables: {
        method: "card",
        stripeUserId: stripeId,
        saveInfo: saveInfo,
        input: {
          userId: id,
          orderId: orderId,
        },
      },
    });
    console.log({ paymentIntentResponse });
    setPaymentIntent(
      paymentIntentResponse.data.createPaymentIntent.paymentStatus
    );
  };

	const chargeCustomerHandler = async () => {
		console.log({ stripeId,  })
    const res = await client.query({
      query: GET_CART_BY_USER,
      variables: { id },
    });
    const orderIdArray = res.data.getCartByUser;
    const orderId = orderIdArray[orderIdArray.length - 1].orderId;
		console.log({ stripeId, orderId, paymentIntent })
		console.log(`Payment intent: ${paymentIntent.substring(0, 27)}`)
		const chargeCustomerResponse = await chargeCustomer({
			variables: {
				method: "card",
				intent: paymentIntent.substring(0, 27),
				input: {
					userId: id,
					orderId: orderId,
					stripeId: stripeId
				}
			}
		})
		console.log({ chargeCustomerResponse })
	}
	
  return (
    <Elements stripe={stripePromise}>
      <div className={styles.form}>
        <h2>Card</h2>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Checkbox onClick={() => setSaveInfo(!saveInfo)} value={saveInfo} />
					<p className={styles.text}>Save infomation?</p>
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
				<CheckoutForm clientSecret={!!paymentIntent ? paymentIntent : null} />
      </div>
    </Elements>
  );
};

export default CreditCardPayment;

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const results = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Kevin Nguyen",
        },
      },
    });
    if (results.error) {
      console.error(results.error.message);
    } else {
      if (results.paymentIntent.status === "succeeded") {
        console.log("Payment successful");
      }
    }
  };
  return (
    <form className={styles.checkout} onSubmit={handleSubmit}>
      <CardSection />
      <Button size="small" disabled={!stripe}>
        Confirm order
      </Button>
    </form>
  );
};

const CardSection = () => {
	const { isAdmin } = userVar()
  const options = {
    style: {
      base: {
				color: `${isAdmin ? "#7116DB" :  "#0069f1"}`,
        fontFamily: '"News Cycle Bold", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#333",
        },
      },
      invalid: {
        color: "#ec5a24",
        iconColor: "#ec5a24",
      },
    },
  };

  return (
    <label className={styles.card}>
      <p className={styles.text}>Card details</p>
      <div className={styles.cardElementWrapper}>
        <CardElement options={options} />
      </div>
    </label>
  );
};
