import styles from "./styles.module.scss";
import ExitButton from "public/svg/exit-button.svg";
import { Input, Checkbox, Button } from "components";
import { customersVar, modalVar } from "graphql/reactiveVar";
import { useState } from "react";

const AddClientDetails = (props) => {
  const [screen, setScreen] = useState('EDIT');
  const {
    customer: { logo },
  } = customersVar();
  return (
    <div
      className={`${styles.wrapper} ${
        screen === "DELETE" ? styles.delete : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ExitButton
        onClick={() => modalVar({ ...modalVar(), isOpen: false })}
        className={styles.close}
      />
      {screen === "EDIT" && (
        <>
          <div className={styles.content}>
            <p className={styles.title}>Client Details</p>
            <div className={styles.gridTwoCol}>
              <div className={styles.flexCol}>
                <p className={styles.title}>Business</p>
                <Input
                  className={styles.input}
                  placeholder="INSERT COMPANY NAME HERE"
                />
                <Input className={styles.input} placeholder="INSERT ABN HERE" />
                <Input className={styles.input} placeholder="COMPANY WEBSITE" />
              </div>
              <div className={styles.flexCol}>
                <p className={styles.title}>Client Logo</p>
                <div className={styles.logoWrapper}>
                  <img className={styles.logo} src={logo} alt={`client logo`} />
                </div>
              </div>
            </div>
            <div className={styles.gridTwoCol}>
              <div className={styles.flexCol}>
                <p className={styles.title}>CONTACT</p>
                <Input
                  className={styles.input}
                  placeholder="INSERT CONTACT NAME"
                />
                <Input className={styles.input} placeholder="EMAIL ADDRESS" />
              </div>
              <div />
            </div>
            <div className={styles.flexCol}>
              <p className={styles.title}>COMPANY ADDRESS</p>
              <Input className={styles.input} placeholder="ADDRESS" />
              <div className={styles.gridTwoCol}>
                <div className={styles.flexCol}>
                  <Input className={styles.input} placeholder="CITY" />
                  <Input className={styles.input} placeholder="STATE" />
                </div>
                <div className={styles.flexCol}>
                  <Input className={styles.input} placeholder="COUNTRY" />
                  <Input
                    className={styles.input}
                    placeholder="POSTCODE/ZIPCODE"
                  />
                </div>
              </div>
              <div className={styles.flex}>
                <Checkbox />
                <p className={styles.title}>
                  UNCHECK IF SAMPLE IS DIFFERENT FROM COMPANY ADDRESS
                </p>
              </div>
            </div>
            <div className={styles.flexCol}>
              <p className={styles.title}>SAMPLE ADDRESS</p>
              <Input className={styles.input} placeholder="ADDRESS" />
              <div className={styles.gridTwoCol}>
                <div className={styles.flexCol}>
                  <Input className={styles.input} placeholder="CITY" />
                  <Input className={styles.input} placeholder="STATE" />
                </div>
                <div className={styles.flexCol}>
                  <Input className={styles.input} placeholder="COUNTRY" />
                  <Input
                    className={styles.input}
                    placeholder="POSTCODE/ZIPCODE"
                  />
                </div>
              </div>
            </div>
            <div className={styles.flexCol}>
              <p className={styles.title}>WAREHOUSE ADDRESS</p>
              <Input className={styles.input} placeholder="ADDRESS" />
              <div className={styles.gridTwoCol}>
                <div className={styles.flexCol}>
                  <Input className={styles.input} placeholder="CITY" />
                  <Input className={styles.input} placeholder="STATE" />
                </div>
                <div className={styles.flexCol}>
                  <Input className={styles.input} placeholder="COUNTRY" />
                  <Input
                    className={styles.input}
                    placeholder="POSTCODE/ZIPCODE"
                  />
                </div>
              </div>
            </div>
            <div className={styles.flexBetween}>
              <p className={styles.delete} onClick={() => setScreen("DELETE")}>
                Delete Customer
              </p>
              <Button align="center" size="small" width="14em">
                Save
              </Button>
            </div>
          </div>
          <div className={styles.gradient} />
        </>
      )}
      {
        (screen === "DELETE" && (
					<>
						<p className={styles.title}>
							Are you sure you want to delete this customer
						</p>
						<div className={styles.content}>
							<p className={styles.caption}>
								Note: This action cannot be undone. Please check
							</p>
							<Button width="100%" size="small" align="center">
								DELETE
							</Button>
							<a
								className={styles.cancel}
								onClick={() => {
									modalVar({ ...modalVar(), isOpen: false });
									setScreen('EDIT')
								}}
							>
								CANCEL
							</a>
						</div>
					</>
				))
			}
		</div>
	);
};

export default AddClientDetails;
