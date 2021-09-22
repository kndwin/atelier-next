import { Layout, ProtectedRoute } from "components";
import styles from "./styles.module.scss";
import ProductDetails from "components/Settings/ProductDetails";
import CompanyDetails from "components/Settings/CompanyDetails";
import AccountDetails from "components/Settings/AccountDetails";
import ShippingDetails from "components/Settings/ShippingDetails";

const Settings = (props) => {
  return (
    <Layout dashboard>
      <div className={styles.wrapper}>
        <ProductDetails />
        <CompanyDetails />
        <AccountDetails />
        <ShippingDetails />
      </div>
    </Layout>
  );
};

export default ProtectedRoute(Settings);
