import { ProtectedRoute, Layout, Banner, Modal, ProductSidebar } from "components";
import styles from "./styles.module.scss";
import OrderTable from "components/Orders/OrderTable";
import { useEffect } from "react";
import { drawerMessageVar, userVar } from "graphql/reactiveVar";
import {useReactiveVar} from "@apollo/client";

const Orders = (props) => {

	const {isAdmin} = userVar()
	useEffect(() => {
		const {isAdmin} = userVar()
		if (isAdmin) {
			drawerMessageVar({
				...drawerMessageVar(),
				type: "IN_PRODUCTION",
				size: 'SMALL',
			});
		} else {
			drawerMessageVar({
				...drawerMessageVar(),
				type: "ORDER_DETAILS",
				size: 'LARGE',
			});
		}
	}, []);

	return (
		<Layout dashboard>
			<div className={styles.wrapper}>
				{isAdmin ? (
					<>
						<Banner customer />
						<div className={`${styles.dashboardContent} ${styles.admin}`}>
							<OrderTable withDelete />
						</div>
					</>
				) : (
					<>
						<Banner news />
						<div className={styles.dashboardContent}>
							<ProductSidebar />
							<OrderTable />
						</div>
					</>
				)}
			</div>
			<Modal />
		</Layout>
	);
};

export default ProtectedRoute(Orders);
