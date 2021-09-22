import styles from "./styles.module.scss";
import UserCard from "./UserCard";
import { Card } from "components";
import { leadsVar, productVar, screenVar } from "graphql/reactiveVar";

export const ProductScreen = (props) => {
  const { products } = productVar();
  const leads = leadsVar();

  return (
    <>
      <div className={styles.userWrapper}>
        {leads.map(({ profilePic, shortIntro, longIntro }, i) => (
          <UserCard
            key={shortIntro + i}
            profilePic={profilePic}
            shortIntro={shortIntro}
            longIntro={longIntro}
          />
        ))}
      </div>
      <div className={styles.productWrapper}>
        {products.map(({ id, name, notification }) => (
          <Card
            key={id}
            name={name}
            notification={notification}
            type="bottle"
            onClick={() => screenVar("PRODUCT_CHAT")}
          />
        ))}
      </div>
    </>
  );
};

export default ProductScreen;
