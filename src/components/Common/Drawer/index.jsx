import React from "react";
import styles from "./styles.module.scss";

import Text from "./Text";
import Carousel from "./Carousel";
import Formulation from "./Formulation";
import Timeline from "./Timeline";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "graphql/reactiveVar";
import ActivityFeed from "./ActivityFeed";
import Reorder from "./Reorder";
import Orders from "./Orders";

const messages = {
  WORK_AREA_WELCOME:
    "Hi There!\n\nWelcome to the work area. Your team has been assigned\n\nLearn more about your team by clicking on the card\n\n:)",
  PRODUCT_CHAT_WELCOME: "Welcome to Chat\n\n:)",
  DASHBOARD_WELCOME:
    "Here are all your products.\n\nClick on a product and the drop down for a more detailed overview.\n\nHead to the next panel to re-order",
  PRODUCT_CHAT_BRIEF_ACCEPTED: [
    "Nice!\n\nYour brief has been accepted :)\n\nWe've hit our first milestone, Woo!\n\nOur next step is building out your supply chain",
    "We're currently working on building your supply chain\n\nWe're finding the best person to bring your product to life :)",
    "Empty, but not for long! :)",
  ],
	ALL_PRODUCTS_WELCOME: `Here are all your products\n\nClick on a product and the drop down for a more detailed overview.\n\nHead to the next panel to re-order`,
	IN_PRODUCTION_WELCOME: `Here is what’s in production right now.\n\n Click on a product to see how it’s tracking.\n\n`
};

const Drawer = (props) => {
  const { isAdmin } = useReactiveVar(userVar);
  const { hidden, type, size } = props;

  return (
    <div
      className={`${styles.wrapper} ${hidden ? "" : styles.hidden} 
			${size === 'LARGE' ? styles.large : ""}
			${isAdmin ? styles.admin : ""}`}
    >
      <div className={styles.overflowWrapper}>
        {[
          "WORK_AREA_WELCOME",
          "PRODUCT_CHAT_WELCOME",
          "ALL_PRODUCT_WELCOME",
        ].includes(type) && <Text cloud>{messages[type]}</Text>}
        {type === "PRODUCT_CHAT_BRIEF_ACCEPTED" && (
          <Carousel>
            {messages[type].map((message) => (
              <Text cloud key={type}>
                {message}
              </Text>
            ))}
          </Carousel>
        )}
        {type === "PRODUCT_CHAT_PROGRESS_FORMULATION_PLANET" && (
          <Formulation planet />
        )}
        {type === "PRODUCT_CHAT_PROGRESS_FORMULATION_TUBE" && (
          <Carousel initSlide={1}>
            <Formulation planet />
            <Formulation tube />
            <Timeline />
          </Carousel>
        )}
        {type === "PRODUCT_CHAT_PROGRESS_FORMULATION_BOTTLE" && (
          <Carousel initSlide={1}>
            <Formulation planet />
            <Formulation bottle />
            <Timeline />
          </Carousel>
        )}
        {type === "PRODUCT_CHAT_PROGRESS_FORMULATION_BOX" && (
          <Carousel initSlide={1}>
            <Formulation planet />
            <Formulation box />
            <Timeline />
          </Carousel>
        )}
        {type === "TIMELINE" && <Timeline />}
        {type === "ACTIVITY_FEED" && (
          <Carousel>
            <Text cloud key={type}>
              {messages["DASHBOARD_WELCOME"]}
            </Text>
            <ActivityFeed all />
          </Carousel>
        )}
				{type === 'ALL_PRODUCTS_REORDER' && (
          <Carousel>
            <Text cloud key={type}>
              {messages["ALL_PRODUCTS_WELCOME"]}
            </Text>
            <Reorder />
          </Carousel>
				)}
				{type === 'IN_PRODUCTION' && (
          <Carousel>
            <Text bottle key={type}>
              {messages["IN_PRODUCTION_WELCOME"]}
            </Text>
							<ActivityFeed product />
          </Carousel>
				)}
				{type === 'ORDER_DETAILS' && <Orders />}
      </div>
    </div>
  );
};

export default Drawer;
