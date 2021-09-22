import { useMutation } from "@apollo/client";
import { Button, Input, Layout } from "components";
import { CHANGE_PASSWORD } from "graphql/mutations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ResetPassword = (props) => {
  const { query } = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [changePassword, { data, error }] = useMutation(CHANGE_PASSWORD);

  useEffect(() => {
    const { email: queryEmail, token: queryToken } = query;
    setToken(queryToken);
    setEmail(queryEmail);
  }, [query]);

  useEffect(() => {
		console.log({ data, error })
    // router.push("/signin");
  }, [data, error]);

  const resetPassword = async () => {
    await changePassword({
      variables: {
        email,
        password,
        token,
      },
    });
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <p className={styles.title}>Reset Password</p>
        <div className={styles.boxWrapper}>
          <div className={styles.inputWrapper}>
            <Input
              style={{ width: "100%" }}
              theme="dark"
              value={email}
              disabled
            />
            <Input onChange={(e) => setPassword(e.target.value)}
						placeholder="New password" type="password" />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            theme="black"
            size="lg"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </Button>
          <Button size="lg" onClick={() => resetPassword()}>
            Reset password
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
