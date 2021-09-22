import { userVar } from "graphql/reactiveVar";
import { useState } from "react";
import styles from "./styles.module.scss";

const Disclosure = (props) => {
  const { children, title } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = userVar();

  return (
    <div
      className={`${styles.wrapper} ${!isOpen ? styles.closed : ""} ${
        isAdmin ? styles.admin : ""
      }`}
    >
      <div
				className={`${styles.titleWrapper} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={styles.title}>{title}</p>
        <div className={styles.iconWrapper}>
          {isOpen ? (
            <div className={styles.minus} />
          ) : (
            <div className={styles.plus} />
          )}
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Disclosure;
