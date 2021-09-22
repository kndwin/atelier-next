import {useReactiveVar} from "@apollo/client";
import Button from "components/Common/Button";
import { modalVar } from "graphql/reactiveVar";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const NewOrder = (props) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
	const { isOpen } = useReactiveVar(modalVar)

	useEffect(() => {
		if (!isOpen) {
			setOrderPlaced(false)
		}
	}, [isOpen])

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!orderPlaced ? (
        <>
          <p className={styles.title}>Congratulations on your new order!</p>
          <div className={styles.buttons}>
            Your order has been placed. Confirm your order below
            <Button reversed width="100%" size="small" align="center"
							onClick={() => setOrderPlaced(true)}
						>
              Confirm Order
            </Button>
            <a
              className={styles.cancel}
              onClick={() => {
                modalVar({ ...modalVar(), isOpen: false });
              }}
            >
              Cancel
            </a>
          </div>
        </>
      ) : (
        <>
          <p className={styles.title}>Your order has been placed</p>
          <div className={styles.buttons}>
            Your order has been placed. Confirm your order below
            <Button reversed width="100%" size="small" align="center">
              View Order
            </Button>
            <a
              className={styles.cancel}
              onClick={() => {
                modalVar({ ...modalVar(), isOpen: false });
              }}
            >
              Maybe Later
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default NewOrder;
