import Button from "components/Common/Button";
import Input from "components/Common/Input";
import Pencil from "public/svg/pencil.svg";
import styles from "./styles.module.scss";
import { useState } from "react";

const ShippingDetails = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { address } = {
    address: "123 Street, Suburb, NSW",
  };
	return (
    <div className={styles.card}>
			<p className={styles.title}>Shipping Details</p>
      {!!editMode ? (
        <div className={styles.editWrapper}>
          <div className={`${styles.twoCol}`}>
            <div>
              <Input placeholder="ADDRESS" theme="disabled" />
              <div className={styles.gridWrapper}>
                <Input placeholder="CITY" theme="disabled" />
                <Input placeholder="STATE" theme="disabled" />
                <Input placeholder="COUNTRY" theme="disabled" />
                <Input placeholder="POSTCODE/ZIP CODE" theme="disabled" />
              </div>
            </div>
            <div>
              <Input placeholder="ADDRESS" theme="disabled" />
              <div className={styles.gridWrapper}>
                <Input placeholder="CITY" theme="disabled" />
                <Input placeholder="STATE" theme="disabled" />
                <Input placeholder="COUNTRY" theme="disabled" />
                <Input placeholder="POSTCODE/ZIP CODE" theme="disabled" />
              </div>
            </div>
          </div>
          <Button
            size="small"
            width="10em"
            align="center"
            onClick={() => setEditMode("")}
          >
            SAVE
          </Button>
        </div>
      ) : (
        <>
          <Pencil
            className={styles.edit}
            onClick={() => setEditMode("PERSONAL_DETAILS")}
          />
          <div className={`${styles.twoCol}`}>
            <div>
              <p className={styles.subtitle}>Sample Address</p>
              <p className={styles.setting}>{address}</p>
            </div>
            <div>
              <p className={styles.subtitle}>Warehouse Address</p>
              <p className={styles.setting}>{address}</p>
            </div>
          </div>
        </>
      )}
    </div>
	)
}

export default ShippingDetails
