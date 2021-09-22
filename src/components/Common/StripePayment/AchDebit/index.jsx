import styles from "./styles.module.scss";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Input, Dropdown, Button } from "components";
import { useEffect, useState } from "react";
import { ACH_VERIFICATION, CREATE_PAYMENT_INTENT } from "graphql/mutations/payment";
import { userVar } from "graphql/reactiveVar";
import { GET_ME } from "graphql/queries";
import { useApolloClient, useMutation } from "@apollo/client";
import {GET_CART_BY_USER} from "graphql/queries/payment";
import Checkbox from "components/Common/Checkbox";

const stripePromise = loadStripe(
  "pk_test_51JS7gUGBlycH6PilyV886bSYmq6uMdeX0Kg6SnQjTPT4fMWsZmT3SrfwiBAjBCU3QRV8PIw4EwZtg4obaIWMyGwv00i9OFvLEd"
);

const AchDebitPayment = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Debit ACH</h2>
        <Form />
      </div>
    </Elements>
  );
};

export default AchDebitPayment;

const Form = () => {
  const stripe = useStripe();
  const client = useApolloClient();
  const [stripeId, setStripeId] = useState("");
  const [intent, setIntent] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [type, setType] = useState("individual");
  const [accountNumber, setAccountNumber] = useState("000123456789");
  const [country, setCountry] = useState("US");
  const [currency, setCurrency] = useState("usd");
  const [accountName, setAccountName] = useState("Kevin");
  const types = [
    { label: "COMPANY", value: "company" },
    { label: "INDIVIDUAL", value: "individual" },
  ];

  const [verifyAch] = useMutation(ACH_VERIFICATION, {
    onError: (err) => console.log(JSON.stringify(err, 0, 2)),
  });

	const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT, {
    onError: (err) => console.log(JSON.stringify(err, 0, 2)),
  });

  const submitBankDetails = async () => {
    const { id: userId } = userVar();
    const { token, error } = await stripe.createToken("bank_account", {
      country,
      currency,
      routing_number: "110000000",
      account_number: accountNumber,
      account_holder_name: accountName,
      account_holder_type: type,
    });

    const verificationComplete = await verifyAch({
      variables: {
        operation: "token",
        userId: userId,
        tokenId: token.id,
      },
    });
    console.log({ token, error, verificationComplete });
  };

	const confirmMicrotransaction = async () => {
    const { id: userId } = userVar();
    const paymentComplete = await verifyAch({
      variables: {
        operation: "verify_bank",
        bankId: "ba_1JaBGDGBlycH6PiloQUvbMI7",
        microDeposit: [32,45],
				stripeId: "cus_KEeZhgoV2OyKQ5",
        userId: userId,
        tokenId: "btok_1JaBGDGBlycH6PilFX95jStm",
      },
    });
		console.log({ paymentComplete })
	}

	const createIntentHandler = async () => {
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
        method: "direct_debit_US",
        stripeUserId: stripeId,
        saveInfo: saveInfo,
        input: {
          userId: id,
          orderId: orderId,
        },
      },
    });
    // if stripdId exist, grab setupIntent, else grab paymentIntent + clientSecret
    const {
      data: {
        createPaymentIntent: { transactionDetails, paymentStatus },
      },
    } = paymentIntentResponse;
    setIntent(stripeId ? transactionDetails : paymentStatus);
    console.table({ stripeId, transactionDetails, paymentStatus });
    console.table(paymentIntentResponse.data.createPaymentIntent);
	}

	const chargeCustomerHandler = async () => {
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
	}

  const updateStripeIdFromServer = async () => {
    const stripeIdResponse = await client.query({
      query: GET_ME,
      fetchPolicy: "network-only",
    });
    console.log({ stripeIdResponse });
    setStripeId(stripeIdResponse.data.me.stripeId);
  };

  return (
		<>
			<div className={styles.grid}>
				<Input
					className={styles.input}
					placeholder="COUNTRY"
					onChange={(e) => setCountry(e.target.value)}
					value={country}
				/>
				<Input
					className={styles.input}
					placeholder="CURRENCY"
					onChange={(e) => setCurrency(e.target.value)}
					value={currency}
				/>
				<Input
					className={styles.input}
					placeholder="ACCOUNT NUMBER"
					onChange={(e) => setAccountNumber(e.target.value)}
					value={accountNumber}
				/>
				<Input
					className={styles.input}
					placeholder="NAME"
					onChange={(e) => setAccountName(e.target.value)}
					value={accountName}
				/>
				<Dropdown placeholder="TYPE" options={types} setOption={setType} />
				<Input
					placeholder="STRIPE ID"
					value={stripeId}
					onChange={() => setStripeId(stripeId)}
				/>
				<div style={{ display: 'flex'}}>
					<Checkbox onClick={() => setSaveInfo(!saveInfo)} value={saveInfo} />
					Save Information?
				</div>
			</div>
			<div className={styles.grid}>
				<Button onClick={() => submitBankDetails()}>Submit bank details</Button>
				<Button onClick={() => confirmMicrotransaction()}>
					Confirm microtransaction
				</Button>
				<Button onClick={() => createIntentHandler()}>
					Create Intent
				</Button>
				<Button onClick={() => chargeCustomerHandler()}>
					Charge Customer
				</Button>
				<Button onClick={() => updateStripeIdFromServer()}>
					Update Stripe
				</Button>
			</div>
		</>
	);
};
