import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import {
  ProtectedRoute,
  Modal,
  ProductSidebar,
  Banner,
  Layout,
} from "components";

import { drawerMessageVar, screenVar, userVar } from "graphql/reactiveVar";
import ProductOverview from "components/AllProducts/ProductOverview";
import ProductForm from "components/AllProducts/ProductForm";
import {useReactiveVar} from "@apollo/client";

const AllProducts = (props) => {
	const { isAdmin } = userVar()
	const { screen } = useReactiveVar(screenVar)
	
  useEffect(() => {
		screenVar({...screenVar(), page: 'ALL_PRODUCTS', screen: 'PRODUCT_OVERVIEW'})
    drawerMessageVar({
      ...drawerMessageVar(),
      type: "ALL_PRODUCTS_REORDER",
      size: "SMALL",
    });
  }, []);

  return (
    <Layout dashboard>
			{isAdmin ? (
				<div className={styles.wrapper}>
					<Banner customer />
					<div className={styles.dashboardContent}>
						<ProductSidebar addProduct />
						{screen === 'PRODUCT_FORM' && <ProductForm />}
						{screen === 'PRODUCT_OVERVIEW' && <ProductOverview />}
					</div>
				</div>
			) : (
				<div className={styles.wrapper}>
					<Banner news />
					<div className={styles.dashboardContent}>
						<ProductSidebar />
						<ProductOverview />
					</div>
				</div>
			)}
			<Modal />
		</Layout>
	);
};

export default ProtectedRoute(AllProducts);
