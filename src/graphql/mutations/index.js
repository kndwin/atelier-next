import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation Login($email: String!) {
    forgotPassword(email: $email) {
      email
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $email: String!
    $password: String!
    $token: String!
  ) {
    changePassword(email: $email, password: $password, token: $token) {
			email
    }
  }
`;

export const SUBMIT_MAILCHIMP_EVENT = gql`
	mutation submitMailchimpEvent($email: String, $event: String){
		submitMailchimpEvent(email: $email, event: $event) {
			name
		}
	}
`
