import styles from "./styles.module.scss";
import { modalVar } from "graphql/reactiveVar";
import { Button } from 'components'

const DeleteOrder = (props) => {
  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p className={styles.title}>
				Are you sure you want to delete this order?
			</p>
      <div className={styles.content}>
				Make sure you're certain because once you delete this you can't get this back!
        <Button width="100%" size="small" align="center">
          DELETE
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
	)
}

export default DeleteOrder
