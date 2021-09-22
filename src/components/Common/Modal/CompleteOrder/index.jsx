import styles from "./styles.module.scss";
import Button from "components/Common/Button";
import { modalVar } from "graphql/reactiveVar";

const CompleteOrder = (props) => {
  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p className={styles.title}>Your order is now in production</p>
      <div className={styles.content}>
        If all you details are correct, click "OK" to continue.
        <Button width="100%" size="small" align="center">
          OK
        </Button>
        <a
          className={styles.cancel}
          onClick={() => {
            modalVar({ ...modalVar(), isOpen: false });
          }}
        >
          CANCEL
        </a>
      </div>
    </div>
  );
};

export default CompleteOrder;
