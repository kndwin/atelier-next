import Card from "components/Common/Card";
import { customersVar, modalVar, screenVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const Customers = (props) => {
  const { customers } = customersVar();
  return (
    <div className={styles.wrapper}>
      {customers?.map(({ logo, name }) => (
        <Card
          key={name}
          image={logo}
          name={name}
          notification={2}
          onClick={() => {
            customersVar({ customers, customer: name });
            screenVar("WORK_AREA");
          }}
        />
      ))}
      <div
        className={styles.addNewCustomer}
        onClick={() =>
          modalVar({ ...modalVar(), isOpen: true, type: "ADD_CLIENT_DETAILS" })
        }
      >
        <p className={styles.content}>Click here to add a new customer</p>
      </div>
    </div>
  );
};

export default Customers;
