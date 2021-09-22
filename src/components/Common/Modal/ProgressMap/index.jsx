import { useReactiveVar } from "@apollo/client";
import { modalVar } from "graphql/reactiveVar";
import Map from "components/Common/Map";
import styles from "./styles.module.scss";
import ExitButton from "public/svg/exit-button.svg";

const ProgressMap = (props) => {
  const { isOpen, type } = useReactiveVar(modalVar);
  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.mapWrapper}>
        <Map />
      </div>
      <ExitButton
        onClick={() => modalVar({ ...modalVar(), isOpen: false })}
        className={styles.close}
      />
      <img
        src="/images/bottle-wrap-around.png"
        className={styles.image}
      />
      <div className={styles.box}>
        <p className={styles.title}>GOODS PICKED UP FROM HONG KONG</p>
        <br />
        <p className={styles.text}>ORDER NO. #00001 JULY 25 - EN ROUTE </p>
        <br />
        <p className={styles.text}>ESTIMATED DELIVERY </p>
        <p className={styles.title}> DATE: AUGUST 18 STATUS: ON TIME</p>
      </div>
    </div>
  );
};

export default ProgressMap;
