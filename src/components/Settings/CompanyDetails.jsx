import styles from "./styles.module.scss";
import Pencil from "public/svg/pencil.svg";
import Button from "components/Common/Button";
import Input from "components/Common/Input";
import {useState} from "react";

const CompanyDetails = (props) => {
	const [editMode, setEditMode] = useState(false)
  const { company, abn, businessAddress } = {
    company: "Bear. LTD",
    abn: "123123123123",
    businessAddress: "123 Street, Suburb, NSW",
  };

  return (
    <div className={styles.card}>
      <p className={styles.title}>Company Details</p>
      {!!editMode ? (
        <div className={styles.editWrapper}>
          <div className={`${styles.twoCol}`}>
            <div className={styles.columnWrapper}>
              <Input placeholder="FIRST AND LAST NAME" theme="disabled" />
              <Input placeholder="EMAIL ADDRESS" theme="disabled" />
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
      <div className={`${styles.threeCol}`}>
          <Pencil
            className={styles.edit}
            onClick={() => setEditMode("PERSONAL_DETAILS")}
          />
        <div>
          <p className={styles.subtitle}>Company</p>
          <p className={styles.setting}>{company}</p>
        </div>
        <div>
          <p className={styles.subtitle}>ABN</p>
          <p className={styles.setting}>{abn}</p>
        </div>

        <div>
          <p className={styles.subtitle}>Business address</p>
          <p className={styles.setting}>{businessAddress}</p>
        </div>
      </div>
			)}
    </div>
  );
};

export default CompanyDetails;
