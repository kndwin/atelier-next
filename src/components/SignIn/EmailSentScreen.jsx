import { Button } from "components";
import { screenVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const EmailSentScreen = () => {
  return (
    <>
      <h2 className={styles.title}>
        Thank you
        <br />
        :)
        <br />
        <br />
        Check you email. We'll see you soon.
      </h2>
      <Button
        width="100%"
        align="center"
        size="small"
        reversed
        onClick={() => {
          screenVar({ ...screenVar(), page: "SIGN_IN", screen: "SIGN_IN" });
        }}
      >
        Sign in
      </Button>
    </>
  );
};

export default EmailSentScreen;
