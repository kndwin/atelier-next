import { useEffect, useState } from "react";
import { Layout } from "components";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import SignInScreen from "components/SignIn/SignInScreen";
import ForgotPasswordScreen from "components/SignIn/ForgotPasswordScreen";
import EmailSentScreen from "components/SignIn/EmailSentScreen";
import Hero from "components/SignIn/Hero";
import { screenVar, userVar } from "graphql/reactiveVar";
import { useReactiveVar } from "@apollo/client";

const SignInPage = () => {
  const router = useRouter();
  const { screen } = useReactiveVar(screenVar);

	useEffect(() => {
		screenVar({...screenVar(), page: 'SIGN_IN', screen: 'SIGN_IN'})
	}, [])

  useEffect(() => {
    const { cookie } = userVar();
    if (!!cookie) {
      router.push("/workarea");
    }
  }, [userVar]);

  return (
    <Layout>
      <div className={`${styles.centerWrapper}`}>
        <div className={styles.cardAndHeroWrapper}>
          <Hero />
          <div className={styles.card}>
            {screen === "SIGN_IN" && <SignInScreen />}
            {screen === "FORGOT_PASSWORD" && <ForgotPasswordScreen />}
            {screen === "EMAIL_SENT" && <EmailSentScreen />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
