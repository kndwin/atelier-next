import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import styles from "./styles.module.scss";
import Eye from "public/svg/eye.svg";
import { Input, Button } from "components";
import { LOGIN } from "graphql/mutations";
import { screenVar, userVar } from "graphql/reactiveVar";

const SignInScreen = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const validateEmail = (value) => {
    const re = /\S+@\S+\.\S+/;
    const emailValid = !re.test(value);
    if (emailValid) {
      setWarning("Not a valid email");
    } else {
      setWarning("");
      setUsername(value);
    }
  };

  // TODO(kndwin): Work with Ricky to let Apollo server
  // return Error
  const [login, { data, error }] = useMutation(LOGIN);
  const signIn = async () => {
    login({ variables: { email: username, password } });
  };

  useEffect(() => {
    if (!!data && data.login) {
      if (
        /Invalid password/.test(data?.login?.token) ||
        /No user found for email/.test(data?.login?.token)
      ) {
        setWarning(data?.login?.token);
      } else {
        // Store in localStorage to ensure user stays logged in after refresh
        localStorage.setItem("token", data?.login?.token);
        userVar({ ...userVar(), cookie: data?.login?.token });
        router.push("/workarea");
      }
    }
  }, [data]);

  return (
    <>
      <h2 className={styles.title}>Sign in</h2>
      <div className={styles.elements}>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          theme="dark"
          placeholder="USERNAME"
          onBlur={(e) => validateEmail(e.target.value)}
          onFocus={() => setWarning("")}
          warning={warning}
          type="email"
        />
        <div className={styles.passwordWrapper}>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            theme="dark"
            placeholder="PASSWORD"
            type={showPassword ? "text" : "password"}
          />
          <Eye
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className={
              showPassword ? styles.passwordIconOpen : styles.passwordIcon
            }
          />
        </div>
        <Button
          size="small"
          onClick={() => signIn()}
          width="100%"
          align="center"
          reversed
        >
          Sign in
        </Button>
        <div className={styles.links}>
          <a
            onClick={() =>
              screenVar({
                ...screenVar(),
                page: "SIGN_IN",
                screen: "FORGOT_PASSWORD",
              })
            }
            className={styles.forgotPassword}
          >
            Forgot password ?
          </a>
        </div>
      </div>
    </>
  );
};

export default SignInScreen;
