import Button from "components/Common/Button";
import Input from "components/Common/Input";
import Pencil from "public/svg/pencil.svg";
import styles from "./styles.module.scss";
import { useState } from "react";

const AccountDetails = (props) => {
  const [editMode, setEditMode] = useState(false);
  const {
    address,
    paymentInformation,
    endingNum,
    paymentType,
    accountingType,
    accountingApi,
  } = {
    address: "123 Street, Suburb, NSW",
    paymentInformation: "Standard, Chartered",
    endingNum: 1234,
    paymentType:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1920px-Mastercard_2019_logo.svg.png",
    accountingApi: "Connected",
    accountingType:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Xero_software_logo.svg/1280px-Xero_software_logo.svg.png",
  };
  return (
    <div className={styles.card}>
      <p className={styles.title}>Accounts Details</p>
      {!!editMode ? (
        <div className={styles.editWrapper}>
          <div className={`${styles.twoCol}`}>
            <div className={styles.columnWrapper}>
              <div>
                <p className={styles.setting}>CARD NUMBER</p>
                <div className={styles.inputWrapper}>
                  <Input placeholder="####-####-####-####" theme="disabled" />
                  <img
                    className={`${styles.icon} ${styles.iconInput}`}
                    src={paymentType}
                  />
                </div>
              </div>

              <div className={styles.twoColSmall}>
                <Input placeholder="COUNTRY" theme="disabled" />
                <Input placeholder="POSTCODE/ZIP CODE" theme="disabled" />
              </div>
              <Input placeholder="STATE" theme="disabled" />
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
            <div>
              <p className={styles.subtitle}>Payment information</p>
              <p className={styles.setting}>{paymentInformation}</p>
              <div className={styles.flex}>
                <img className={styles.icon} src={paymentType} />
                <p className={styles.text}>Ending: {endingNum}</p>
              </div>
            </div>
            <div>
              <p className={styles.subtitle}>Accounting api</p>
              <div className={styles.flex}>
                <img className={styles.icon} src={accountingType} />
                <p className={styles.text}>{accountingApi}</p>
              </div>
            </div>
            <div>
              <p className={styles.subtitle}>Business address</p>
              <p className={styles.setting}>{address}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountDetails;
