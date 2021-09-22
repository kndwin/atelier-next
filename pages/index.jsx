import { useEffect } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Layout, Button, Disclosure, Input, ProtectedRoute } from "components";

import AchDebitPayment from "components/Common/StripePayment/AchDebit";
import AuBecsDebitPayment from "components/Common/StripePayment/AuBecsDebit";
import CreditCardPayment from "components/Common/StripePayment/Credit";

import { SUBMIT_MAILCHIMP_EVENT } from "graphql/mutations";
import { CREATE_CART } from "graphql/mutations/cart";
import { CREATE_PRODUCT } from "graphql/mutations/products";
import { GET_PRODUCTS_BY_USER } from "graphql/queries";
import { userVar } from "graphql/reactiveVar";
import styles from "./index.module.scss";

const Home = () => {
  return (
		<Layout dashboard>
			<div className={styles.wrapper}>
			<MailChimpTest />
			<Disclosure title="FORMS">
				<ProductForm />
				<CartForm />
			</Disclosure>
			<Disclosure title="PAYMENTS">
				<div className={styles.grid}>
					<CreditCardPayment />
					<AuBecsDebitPayment />
					<AchDebitPayment />
				</div>
			</Disclosure>
			</div>
		</Layout>
	);
};

export default ProtectedRoute(Home);

const MailChimpTest = () => {
	const [submitEvent, { data, error }] = useMutation(SUBMIT_MAILCHIMP_EVENT, {
		onError: (error) => console.log(JSON.stringify(error, 0, 2)),
	});

	useEffect(() => {
		console.log({ data });
		console.log(JSON.stringify(error, 0, 2));
	}, [data, error]);

	const submitEventHandler = async () => {
		const event = "abandoned_cart";
		const { email } = userVar();
		console.log(userVar());
		submitEvent({ variables: { email, event } });
	};

	return (
		<>
			<Button onClick={() => submitEventHandler()}>
				Submit Abandonned Cart Event
			</Button>
		</>
	);
};

const ProductForm = () => {
	const { id } = userVar();
	const data = {
		bottleName: "Test Product",
		bottleSize: "bottleSize",
		bottleColor: "bottleColor",
		closureName: "closureName",
		closureColor: "closureColor",
		closureNeckSize: "closureNeckSize",
		artworkImage: "artworkImage",
		closureImage: "closureImage",
		primaryProductionTime: 2,
		closureProductionTime: 5,
		primaryDocument: "document ",
		boxType: "Test Product",
		boxMaterial: "boxMaterial",
		boxSize: "boxSize",
		shippingType: "shippingType",
		shippingMaterial: "shippingMaterial",
		shippingSize: 3,
		cartonArtworkImage: "cartonArtworkImage",
		cartonShippingImage: "cartonShippingImage",
		secondaryProductionTime: 2,
		secondaryDocument: "secondaryDocument",
		ingredientsList: ["Test Product"],
		formulationProductionTime: 10,
		formulationDocument: "",
		userId: id,
		name: "my product",
		volume: 3,
		heroImage: "heroImage",
		manufacturingPlace: "manufacturingPlace",
		units: 8,
		pricePerUnit: 5.5,
		rrp: 7,
		margin: 12,
		productionTime: 5,
		labelPackaging: "labelPackaging",
		material: "material",
		dimensions: "dimensions",
		inProduction: 3,
		image: "image",
		document: "document",
		carbonOffset: 16,
		primaryManufacturerIds: ["primaryManufacturerIds"],
		secondaryManufacturerId: ["secondaryManufacturerId"],
		formulationManufacturerId: ["formulationManufacturerId"],
		labelManufacturerId: ["labelManufacturerId"],
		closureManufacturerId: ["closureManufacturerId"],
		amount: 25,
		closureDesc: "closureDesc",
		lastProduction: "2021-12-03T10:15:30Z",
		totalCount: 30,
		totalSold: 2500,
		totalRating: 20,
		avgRating: 5,
		totalComplaints: 3,
		status: "active",
	};

	const [createProduct] = useMutation(CREATE_PRODUCT, {
		onCompleted: (data) => console.log({ data }),
		onError: (err) => console.log(JSON.stringify(err, 0, 2)),
	});
	const createProductHandler = () => {
		createProduct({ variables: { ...data } });
	};

	return (
		<div className={styles.productForm}>
			<p className={styles.title}>Add product Text</p>
			<div className={styles.form}>
				{Object.entries(data).map(([key, value]) => (
					<div key={key} className={styles.value}>
						<p className={styles.label}>{key}</p>
						<Input readOnly value={value} />
					</div>
				))}
			</div>
			<Button onClick={() => createProductHandler()}>Submit Product</Button>
		</div>
	);
};

const CartForm = () => {
	const [createCart] = useMutation(CREATE_CART, {
		onCompleted: (data) => console.log({ data }),
		onError: (err) => console.log(JSON.stringify(err, 0, 2)),
	});

	const client = useApolloClient();

	const { id } = userVar();

	const data = {
		userId: id,
		productId: "",
		price: 1.2,
		quantity: 10,
		totalAmount: 2500.0,
		amountLeft: 0,
		amountPaid: 1250.0,
		status: "pending",
		primaryStatus: "submitted",
		primaryOption: "delayed",
		secondaryStatus: "pending",
		secondaryOption: "delayed",
		formulationStatus: "pending",
		formulationOption: "pending",
		labelStatus: "pending",
		labelOption: "pending",
		isDelivered: false,
		donationAmount: 2.5,
		donationCard: "housing",
		carbonAmount: 10,
		discount: 20,
		isFiftyPercent: true,
		isFivePercent: true,
		isPaymentDone: false,
		address: "address",
		city: "city",
		state: "state",
		country: "country",
		pinCode: 2600,
		oneTimeTrigger: false,
	};

	const createCartHandler = async () => {
		const res = await client.query({
			query: GET_PRODUCTS_BY_USER,
			variables: { id },
		});
		const products = res.data.getProductsByUser;
		const newData = { ...data, productId: products.at(-1).productId };
		console.log({ newData });
		createCart({ variables: { ...newData } });
	};
	return (
		<div className={styles.cartForm}>
			<p className={styles.title}>Add product Text</p>
			<div className={styles.form}>
				{Object.entries(data).map(([key, value]) => (
					<div key={key} className={styles.value}>
						<p className={styles.label}>{key}</p>
						<Input readOnly value={value} />
					</div>
				))}
			</div>
			<Button onClick={() => createCartHandler()}>Submit Cart</Button>
		</div>
	);
};
