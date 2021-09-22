import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    me {
      name
			email
      isAdmin
			profilePic
			id
			stripeId
    }
  }
`;

export const GET_PRODUCTS_BY_USER = gql`
	query GetProductsByUser($id: String) {
		getProductsByUser(id: $id) {
			productId
		}
	}
`
