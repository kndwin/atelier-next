import styles from "./styles.module.scss";
import Button from "components/Common/Button";
import Input from "components/Common/Input";

const OrderAddressEdit = (props) => {
  return (
    <div className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
		>
      <p className={styles.title}>
        Update and change your delievery details for this order shipment
      </p>
      <div className={styles.editWrapper}>
        <p className={styles.textBold}>Shipping Address</p>
        <p className={styles.text}>Delivery Address</p>
				<Input placeholder="ADDRESS" width='100%' />
        <div className={styles.grid}>
          <Input placeholder="CITY" />
          <Input placeholder="STATE" />
          <Input placeholder="COUNTRY" />
          <Input placeholder="POSTCODE" />
        </div>
				<div className={styles.buttonWrapper}>
        <Button width="15em" size="small" align="center">
          Submit
        </Button>
				</div>
      </div>
    </div>
  );
};

export default OrderAddressEdit;
