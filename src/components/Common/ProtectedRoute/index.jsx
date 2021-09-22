import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userVar } from "graphql/reactiveVar";
import { GET_ME } from "graphql/queries";
import {useApolloClient, useLazyQuery, useQuery} from "@apollo/client";

const ProtectedRoute = (WrappedComponent) => {
  const AuthHandler = (props) => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const router = useRouter();
		const client = useApolloClient()

		const fetchMe = async (cookie) => {
			const res = await client.query({ query: GET_ME})
			const data = res.data.me
			userVar({...userVar(), ...data , cookie});
		}
		useEffect(() => {
      const cookie = localStorage.getItem("token");
			console.log({ cookie })
			const { id } = userVar()
      if (!!cookie) {
        setLoading(false);
        setLoggedIn(true);
				if (id === "") {
					fetchMe(cookie)
				}
			} 
			if (!cookie) {
        setLoading(false);
        router.push("/signin");
      }
    }, []);

    // Show loading flag on protected route whilst auth is checked
    if (loading) {
      return null;
    }

    if (loggedIn) {
      return <WrappedComponent {...props} />;
    }

    // Bounce back to register page
    return <div />;
  };

  return AuthHandler;
};

export default ProtectedRoute;
