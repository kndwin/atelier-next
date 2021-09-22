import { gql } from "@apollo/client";

export const CREATE_PAYMENT_INTENT = gql`
	mutation CreatePaymentIntent (
		$method: String!
		$stripeUserId: String
		$saveInfo: Boolean
		$input: PaymentCreateInput
	) {
		createPaymentIntent(
			method: $method, 
			stripeUserId: $stripeUserId, 
			saveInfo: $saveInfo, 
			input: $input
		) {
			paymentId
			paymentStatus
			stripeId
			transactionDetails
		}
	}
`;

export const CHARGE_CUSTOMER = gql`
	mutation ChargeCustomer (
		$method: String!
		$intent: String
		$input: PaymentCreateInput
	) {
		chargeCustomer(
			method: $method,
			paymentIntent: $intent,
			input: $input
		) { 
			transactionDetails
		}
	} 
`

export const ACH_VERIFICATION = gql`
	mutation AchVerification (
		$operation: String!,
		$microDeposit: [Int],
		$bankId: String
		$stripeId: String,
		$tokenId: String!,
		$userId: String!
	) {
		achVerification(
			operation: $operation,
			microDeposit: $microDeposit
			bankId: $bankId
			stripeId: $stripeId,
			tokenID: $tokenId,
			userId: $userId
		) {
			stripeId
		}
	}
`
