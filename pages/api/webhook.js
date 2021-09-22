import Stripe from "stripe"

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe("sk_test_51JS7gUGBlycH6PilBD1hVpX6KEDtezjFERcLX1vMSAcrCAgTLqtU3anx9TY70WgYsOjGlD8O2V47VTiKmFXBlCXR004b52kSSw")
const endpointSecret = "whsec_PsfY2KDassN4IM8MUQyQM9gv7ARObah1"

const webhookPayloadParser = (req) => new Promise((resolve) => {
	let data = "";
	req.on("data", (chunk) => {
		data += chunk;
	});
	req.on("end", () => {
		resolve(Buffer.from(data).toString());
	});
});

export default async function handler(req, res) {
	const body= await webhookPayloadParser(req)
	const {headers: { 'stripe-signature': sig }} = req

	console.log({ body, sig })

	let event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: err})
		return
	}

	switch (event.type) {
		case 'payment_intent.succeeded':
			console.log(`Success!`)
			break;
		case 'payment_intent.processing':
			console.log(`Processing!`)
			break;
		case 'payment_intent.payment_failed':
			console.log(`Failed!`)
			break;
		default: 
			console.log(`Unhandled type: ${event.type}`)
	}

	res.status(200).json({ success: true })
}
