import { useState } from "react";
import { drawerMessageVar, userVar } from "graphql/reactiveVar";
import { useReactiveVar } from "@apollo/client";

import { Card, Dropdown } from "components";
import styles from "./styles.module.scss";

const Sidebar = (props) => {
  const [productFocus, setProductFocus] = useState("FORMULATION");
  const { isAdmin } = useReactiveVar(userVar);
  const options = [
    { title: "Product 1" },
    { title: "Product 2" },
    { title: "Product 3" },
  ];
  const [productTypes, setProductTypes] = useState([
    {
      id: 14,
      name: "formulation",
      type: "tube",
      message: "PRODUCT_CHAT_PROGRESS_FORMULATION_TUBE",
    },
    {
      id: 15,
      name: "primary packaging",
      notification: 23,
      type: "bottle",
      message: "PRODUCT_CHAT_PROGRESS_FORMULATION_BOTTLE",
    },
    {
      id: 16,
      name: "secondary packaging",
      notification: 400,
      type: "box",
      message: "PRODUCT_CHAT_PROGRESS_FORMULATION_BOX",
    },
  ]);

  return (
    <div className={styles.productChatSidebar}>
      <Dropdown className={styles.dropdownButton} placeholder="Product 1" options={options} />
      {productTypes.map(({ name, type, message, notification, id }) => (
        <Card
          className={`${styles.productCard} 
						${productFocus === name ? styles.productCardFocus : ""} 
						${isAdmin ? styles.admin : ""} 
						`}
          onClick={() => {
            setProductFocus(name);
						drawerMessageVar({...drawerMessageVar(), type: message});
          }}
          key={id}
          type={type}
          name={name}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default Sidebar;
