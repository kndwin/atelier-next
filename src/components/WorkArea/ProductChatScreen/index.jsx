import React, { useEffect, useRef } from "react";

import { drawerMessageVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

import PreviousChat from "./PreviousChat";
import ChatBox from "./ChatBox";
import Sidebar from "./Sidebar";

const ProductChatScreen = () => {
  const scrollBottomRef = useRef(null);

  useEffect(() => {
		drawerMessageVar({...drawerMessageVar(), type: "PRODUCT_CHAT_WELCOME" });
  }, []);

  return (
    <div className={styles.productChatWrapper}>
      <div className={styles.productChatAndSidebarWrapper}>
        <Sidebar />
        <div className={styles.productChat}>
          <PreviousChat scrollBottomRef={scrollBottomRef} />
          <ChatBox scrollBottomRef={scrollBottomRef} />
        </div>
      </div>
    </div>
  );
};

export default ProductChatScreen;
