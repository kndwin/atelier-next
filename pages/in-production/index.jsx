import { useEffect } from "react";
import { drawerMessageVar, userVar } from "graphql/reactiveVar";

import {
  ProtectedRoute,
  Layout,
  Banner,
  Modal,
  ProductSidebar,
} from "components";

import styles from "./styles.module.scss";
import ProductTracking from "components/InProduction/ProductTracking";
import ProductTimeline from "components/InProduction/ProductTimeline";
import {useReactiveVar} from "@apollo/client";

const InProduction = () => {

	const { isAdmin } =  useReactiveVar(userVar)

  useEffect(() => {
		drawerMessageVar({
			...drawerMessageVar(),
			type: "IN_PRODUCTION",
			size: "SMALL",
		})
	}, []);

  return (
    <Layout dashboard>
      <div className={styles.wrapper}>
				{isAdmin ? (
					<>
						<Banner customer />
						<div className={styles.dashboardContent}>
							<ProductSidebar />
							<ProductTracking />
							<ProductTimeline addPost />
						</div>
					</>
				) : (
					<>
						<Banner news />
						<div className={styles.dashboardContent}>
							<ProductSidebar />
							<ProductTracking />
							<ProductTimeline />
						</div>
					</>
				)}
			</div>
			<Modal />
    </Layout>
  );
};

export default ProtectedRoute(InProduction);
