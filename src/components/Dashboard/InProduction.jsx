import Card from "components/Common/Card";
import styles from "./styles.module.scss";

const InProduction = (props) => {
  const products = [
    {
      id: 2,
      name: "wonder",
      image: "images/product-1.png",
      status: "PENDING",
    },
    {
      id: 3,
      name: "magic",
      image: "images/product-2.png",
      status: "IN_PRODUCTION",
    },
  ];

  const color = { IN_PRODUCTION: "green", PENDING: "orange" };
  return (
    <div className={styles.inProduction}>
      {products.map(({ id, name, image, status }) => (
        <div className={styles.cardWrapper}>
          <Card
            bottle
            name={name}
            key={id}
            image={image}
            statusColor={color[status]}
            statusContent={status.replace("_", " ")}
          />
        </div>
      ))}
    </div>
  );
};

export default InProduction;
