import styles from "./styles.module.scss";
import LetsTalk from "public/svg/lets-talk.svg";

import { Layout, Input, Button } from "components";

const Contact = (props) => {
  return (
    <Layout dashboard>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <LetsTalk className={styles.letsTalk} />
          <Input placeholder="SUBJECT" />
          <textarea
            placeholder="COMPANY NAME"
            className={styles.textarea}
            name=""
            cols="30"
            rows="10"
          />
          <Button size="small" align="center" width="10em">
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
