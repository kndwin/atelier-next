import {useReactiveVar} from "@apollo/client";
import Button from "components/Common/Button";
import Slider from "components/Common/Slider";
import { modalVar, productVar, userVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const Reorder = (props) => {
  const {
    product: {
      name,
      image,
      quantity,
      cost,
      units,
      rrp,
      margin,
      productionTime,
    },
  } = productVar();
  const date = new Date(Date.now()).toDateString();
	const { isAdmin} = useReactiveVar(userVar)
  return (
		<div className={`${styles.reorderWrapper} ${isAdmin ? styles.admin : ""}`}>
      <p className={styles.title}>
        Reorder: <br />
        {name}
      </p>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt="Image of product" />
      </div>
      <p className={styles.title2}>quantity</p>
      <Slider value={quantity} />
      <div className={styles.quantityStats}>
        <div>
          <p className={styles.statTitle}>cost</p>
          <p className={styles.stat}>$ {cost}</p>
        </div>
        <div>
          <p className={styles.statTitle}>units</p>
          <p className={styles.stat}>{units}</p>
        </div>
        <div>
          <p className={styles.statTitle}>rrp</p>
          <p className={styles.stat}>{rrp}</p>
        </div>
        <div>
          <p className={styles.statTitle}>margin</p>
          <p className={styles.stat}>{margin}</p>
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles.productionTimeWrapper}>
        <p className={styles.title}>production time</p>
        <p className={styles.stat}>{productionTime}</p>
      </div>
      <div className={styles.arrivalEstimateWrapper}>
        <p className={styles.text}>
          If you order now, your product will land in your distribution center
          by:
        </p>
        <p className={styles.date}>{date}</p>
      </div>
			<div className={styles.buttonWrapper}>
			<Button reversed width='13em' align='center' size='small'
				onClick={() => modalVar({isOpen: true, type: 'NEW_ORDER'})}
			>
				Submit
			</Button>
			</div>
    </div>
  );
};

export default Reorder;
