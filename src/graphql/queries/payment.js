import { gql } from '@apollo/client'

export const GET_CART_BY_USER = gql`
	query GetCartByUser($id: String!) {
		getCartByUser(id: $id) {
			orderId
		}
	}
`
