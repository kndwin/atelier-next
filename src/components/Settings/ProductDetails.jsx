import Button from "components/Common/Button";
import Input from "components/Common/Input";
import Pencil from "public/svg/pencil.svg";
import styles from "./styles.module.scss";
import { useState } from "react";
import { userVar } from "graphql/reactiveVar";

const ProductDetails = (props) => {
  const { name } = userVar();
  const { email, phone, address } = {
    email: "kevin@atelier.co",
    phone: "0412341234",
    address: "123 Street, Suburb, NSW",
  };
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={styles.card}>
      <p className={styles.title}>Personal Details</p>
      {!!editMode ? (
        <div className={styles.editWrapper}>
          <div className={`${styles.threeCol}`}>
            <div className={styles.editImageWrapper}>
              <img
                className={styles.image}
                src="https://avatars.dicebear.com/api/croodles/:seedy.svg"
                alt=""
              />
              <p className={styles.setting}>CHANGE</p>
            </div>
            <div className={styles.columnWrapper}>
              <Input placeholder="FIRST AND LAST NAME" theme="disabled" />
              <Input placeholder="EMAIL ADDRESS" theme="disabled" />
              <Input placeholder="PHONE NUMBER" theme="disabled" />
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
          <div className={`${styles.threeCol}`}>
            <img
              className={styles.image}
              src="https://avatars.dicebear.com/api/croodles/:seedy.svg"
              alt=""
            />
            <div>
              <p className={styles.subtitle}>Your name</p>
              <p className={styles.setting}>{name}</p>
              <p className={styles.subtitle}>Email address</p>
              <p className={styles.setting}>{email}</p>
              <p className={styles.subtitle}>Phone</p>
              <p className={styles.setting}>{phone}</p>
            </div>
            <div>
              <p className={styles.subtitle}>Address</p>
              <p className={styles.setting}>{address}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
