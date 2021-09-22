import {userVar} from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const Status = (props) => {
  const { color, children, width, align } = props;
  const { isAdmin } = userVar();

  return (
    <div
      className={`${styles.status} ${color === "blue" ? styles.blue : ""} ${
        color === "green" ? styles.green : ""
      } ${color === "orange" ? styles.orange : ""} ${
        align === "center" ? styles.alignCenter : ""
      } ${isAdmin ? styles.admin : ""}
			`}
      style={!!width ? { width } : {}}
    >
      <div className={`${styles.text}`}>{children}</div>
    </div>
  );
};

export default Status;
