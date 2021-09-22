import { useEffect } from "react";

import styles from "./styles.module.scss";
import { drawerMessageVar, productVar, userVar } from "graphql/reactiveVar";
import { ProtectedRoute, Banner, Layout, ProductSidebar } from "components";

import InProduction from "components/Dashboard/InProduction";
import Orders from "components/Dashboard/Orders";

const Dashboard = (props) => {
  const content =
    "Water (Aqua), Glycerin, Squalane, Coco-Caprylate, Tribehenin PEG 20 Esters, Simmondsia Chinensis (Jojoba) Seed Oil, Jojoba Esters, Sodium Acrylates Copolymer, Phenoxyethanol, Saccharide Isomerate, Helianthus Annuus (Sunflower) Seed Wax, Ethylhexylglycerin, Lecithin, Silica.";

  useEffect(() => {
    drawerMessageVar({
      ...drawerMessageVar(),
      type: "ACTIVITY_FEED",
      size: "SMALL",
    });
  }, []);

  const { isAdmin } = userVar();
	const { product: { name }} = productVar()

  return (
    <Layout dashboard>
      <div className={styles.dashboardWrapper}>
        {!isAdmin ? (
          <>
            <Banner news />
            <div className={`${styles.dashboardContent}`}>
              <ProductSidebar />
              <div className={styles.centerWrapper}>
                <div className={styles.flex}>
                  <div className={styles.action}>
                    <h2 className={styles.title}>Actions</h2>
                    <p className={styles.description}>{content}</p>
                  </div>
                  <div className={styles.interesting}>
                    <h2 className={styles.title}>
                      Something interesting for you :)
                    </h2>
                  </div>
                </div>
                <div className={styles.orders}>
                  <h2 className={styles.title}>Your Orders</h2>
                  <Orders />
                </div>
              </div>
              <div className={styles.inProductionWrapper}>
                <InProduction />
              </div>
            </div>
          </>
        ) : (
					<>
					<Banner customer />
          <div className={`${styles.dashboardContent}`}>
            <ProductSidebar addProduct />
            <div className={styles.centerWrapper}>
              <div className={styles.orders}>
                <h2 className={styles.title}>{name} Orders</h2>
                <Orders />
              </div>
            </div>
            <div className={styles.inProductionWrapper}>
              <InProduction />
            </div>
          </div>
					</>
        )}
      </div>
    </Layout>
  );
};

export default ProtectedRoute(Dashboard);
