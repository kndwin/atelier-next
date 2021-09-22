import { useReactiveVar } from "@apollo/client";
import { screenVar, userVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

import Bottle from "public/svg/bottle.svg";
import Tube from "public/svg/tube.svg";
import Box from "public/svg/box.svg";
import Plus from "public/svg/plus-box-icon.svg";
import Status from "../Status";

const Card = (props) => {
  const {
    name,
    notification,
    className,
    type,
    children,
    image,
    size,
    statusContent,
    statusColor,
    addProduct,
    ...newProps
  } = props;
  const { isAdmin } = useReactiveVar(userVar);
  return (
    <div
      {...newProps}
      className={`${styles.productCard} ${!!className ? className : ""} ${
        !!size === "large" ? styles.large : ""
      } ${!!isAdmin ? styles.admin : ""}`}
    >
      {!!statusContent && (
        <div className={styles.statusWrapper}>
          <Status width="100%" justify="center" color={statusColor}>
            {statusContent}
          </Status>
        </div>
      )}
      {!!notification && (
        <div
          className={notification === "NEW" ? styles.new : styles.notification}
        >
          {notification}
        </div>
      )}
      {type === "bottle" && <Bottle className={styles.bottle} />}
      {type === "box" && <Box className={styles.box} />}
      {type === "tube" && <Tube className={styles.tube} />}
      {!!image && <img className={styles.image} src={image} alt={`${image}`} />}
      {!!addProduct && <Plus className={styles.addProduct} />}
      {!!name && <p className={styles.name}>{name}</p>}
      {!!children && <p className={styles.children}>{children}</p>}
    </div>
  );
};

export default Card;
