import {Layout, Modal, ProtectedRoute, Banner } from "components";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
  customersVar,
  drawerMessageVar,
  productVar,
  screenVar,
  userVar,
} from "graphql/reactiveVar";
import { useEffect, useState } from "react";
import { GET_ME } from "graphql/queries";

import ProductChatScreen from "components/WorkArea/ProductChatScreen";
import ProductScreen from "components/WorkArea/ProductScreen";
import Customers from "components/WorkArea/Customers";

const WorkArea = () => {
  const { isAdmin } = useReactiveVar(userVar);
  const screen = useReactiveVar(screenVar);
  const { customer } = useReactiveVar(customersVar);
  const { product } = useReactiveVar(productVar);

  const { data: getMeData, loading: getMeLoading } = useQuery(GET_ME, {
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
  });

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    if (mount) {
			const data = getMeData?.me
      userVar({...userVar(),...data});
      if (getMeData?.me?.isAdmin) {
        screenVar("CUSTOMERS");
      } else {
        screenVar("WORK_AREA");
      }
    }
  }, [getMeData]);

  useEffect(() => {
    if (screen === "WORK_AREA") {
      drawerMessageVar({
        ...drawerMessageVar(),
        type: "WORK_AREA_WELCOME",
        size: "SMALL",
      });
    }
  }, [screen]);

  if (getMeLoading && mount) {
    return null;
  }

  return (
    <Layout dashboard>
      {!isAdmin && (
        <>
          {screen === "WORK_AREA" && <ProductScreen />}
          {screen === "PRODUCT_CHAT" && (
            <>
              <Banner product={product.name} />
              <ProductChatScreen />
            </>
          )}
        </>
      )}
      {isAdmin && (
        <>
          {screen === "CUSTOMERS" && (
            <>
              <Banner customerTitle></Banner>
              <Customers />
            </>
          )}
          {screen === "WORK_AREA" && (
            <>
              <Banner customer={customer} product={product.name} />
              <ProductScreen />
            </>
          )}
          {screen === "PRODUCT_CHAT" && (
            <>
              <Banner customer={customer} product={product.name} />
              <ProductChatScreen />
            </>
          )}
        </>
      )}
			<Modal />
    </Layout>
  );
};

export default ProtectedRoute(WorkArea);
