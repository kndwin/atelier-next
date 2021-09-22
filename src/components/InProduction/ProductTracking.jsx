import { useReactiveVar } from "@apollo/client";
import Button from "components/Common/Button";
import { productVar, userVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const ProductTracking = (props) => {
  const {
    product: { name },
  } = productVar();
  const buttons = [
    { title: "Primary Packaging", percentage: 75 },
    { title: "Secondary Packaging", percentage: 75 },
    { title: "Label", percentage: 25 },
    { title: "Formulation", percentage: 90 },
  ];

  const { isAdmin } = useReactiveVar(userVar);
  return (
    <div
      className={`${styles.productionTrackingWrapper} ${
        isAdmin ? styles.admin : ""
      }`}
    >
      <p className={styles.title}>
        Product Tracking: <br />
        {name}
      </p>
      {buttons.map(({ title, percentage }) => (
        <Button
          className={styles.button}
          percentage={percentage}
          size="large"
          theme={isAdmin ? "atelier-blue" : "sidebar"}
        >
          {title}
        </Button>
      ))}
      {isAdmin && (
        <div className={styles.speech}>
					<div className={styles.content}>
						<p className={styles.title}>Product time</p>
						<p className={styles.caption}>It's the first day of</p>
					</div>
          <div className={styles.circleGradient}>
						<p className={styles.dayTitle}>Day</p>
						<p className={styles.day}>1</p>
					</div>
        </div>
      )}
    </div>
  );
};

export default ProductTracking;
