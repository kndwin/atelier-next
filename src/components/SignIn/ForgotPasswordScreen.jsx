import { useMutation } from "@apollo/client";
import { Input, Button } from "components";
import { FORGOT_PASSWORD } from "graphql/mutations";
import {screenVar} from "graphql/reactiveVar";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");

  const validateEmail = (value) => {
    const re = /\S+@\S+\.\S+/;
    const emailValid = !re.test(value);
    if (emailValid) {
      setWarning("Not a valid email");
    } else {
      setWarning("");
      setEmail(value);
    }
  };

	// TODO(kndwin): Implement better error handling for failed password
	// triggers
  const [forgotPassword, { data, error }] = useMutation(FORGOT_PASSWORD, {
    onError: (error) => setWarning(error.name),
  });

  const sendEmail = async () => {
    if (email.length < 1) {
      setWarning("No email set");
    }
    if (!warning) {
      const res = await forgotPassword({ variables: { email } });
			screenVar({...screenVar(), page: 'SIGN_IN', screen: "EMAIL_SENT"})
    }
  };

  return (
    <>
      <h2 className={styles.title}>
        No worries! <br />
        Enter the email associated with your acccount and we will send you a
        reset
      </h2>
      <div className={styles.elements}>
        <Input
          id="email"
          name="email"
          theme="dark"
          placeholder="EMAIL ADDRESS"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onBlur={(e) => validateEmail(e.target.value)}
          onMouseOut={(e) => validateEmail(e.target.value)}
          onFocus={() => setWarning("")}
          warning={warning}
          type="email"
        />
        <Button
          align="center"
          width="100%"
          reversed
					size='small'
          onClick={() => sendEmail(warning)}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;
