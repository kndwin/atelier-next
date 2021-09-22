import { gql } from "@apollo/client";

export const CREATE_CART = gql`
	mutation addCart(
		$userId:            String!
		$productId:         String!
		$price:             Float
		$quantity:          Int
		$totalAmount:       Float
		$amountLeft:        Float
		$amountPaid:        Float
		$status:            OrderStatus
		$primaryStatus:     ProdCartStatus
		$primaryOption:     ProdStatusOptions
		$secondaryStatus:   ProdCartStatus
		$secondaryOption:   ProdStatusOptions
		$formulationStatus: ProdCartStatus
		$formulationOption: ProdStatusOptions
		$labelStatus:       ProdCartStatus
		$labelOption:       ProdStatusOptions
		$isDelivered:       Boolean!
		$donationAmount:    Float!
		$donationCard:      DonationOptions
		$carbonAmount:      Int!
		$discount:          Int!
		$isFiftyPercent:    Boolean!
		$isFivePercent:     Boolean!
		$isPaymentDone:     Boolean!
		$address:           String!
		$city:              String!
		$state:             String!
		$country:           String!
		$pinCode:           Int!
		$oneTimeTrigger:    Boolean!
	){
		addCart(
			input:{
				userId:$userId
				productId:$productId
				price:$price
				quantity:$quantity
				totalAmount:$totalAmount
				amountLeft:$amountLeft
				amountPaid:$amountPaid
				status:$status
				primaryStatus:$primaryStatus
				primaryOption:$primaryOption
				secondaryStatus:$secondaryStatus
				secondaryOption:$secondaryOption
				formulationStatus:$formulationStatus
				formulationOption:$formulationOption
				labelStatus:$labelStatus
				labelOption:$labelOption
				isDelivered:$isDelivered
				donationAmount:$donationAmount
				donationCard:$donationCard
				carbonAmount:$carbonAmount
				discount:$discount
				isFiftyPercent:$isFiftyPercent
				isFivePercent:$isFivePercent
				isPaymentDone:$isPaymentDone
				address:$address
				city:$city
				state:$state
				country:$country
				pinCode:$pinCode
				oneTimeTrigger:$oneTimeTrigger
			}
		){
			orderId
		}
	}
`
