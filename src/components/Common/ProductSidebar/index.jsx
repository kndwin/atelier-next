import { useReactiveVar } from "@apollo/client";
import Card from "components/Common/Card";
import { customersVar, productVar, screenVar } from "graphql/reactiveVar";
import styles from "./styles.module.scss";

const ProductSidebar = (props) => {
	const { addProduct } = props;
	const { products } = useReactiveVar(productVar);
	const { customer: { name } } = customersVar()
	const toggleScreen = () => {
		const { screen, page } = screenVar()
		if (page === "ALL_PRODUCTS" && screen === "PRODUCT_OVERVIEW") {
			screenVar({...screenVar(), screen: "PRODUCT_FORM"})
		}
	}
	return (
		<div className={styles.productSidebarWrapper}>
			<div className={styles.productsOverflowWrapper}>
				<div className={styles.productSidebar}>
					{/* Temporary solution for easier UI debugging ⬇ */}
					{!addProduct && products.map(({ id, name, image }) => (
						<div className={styles.cardWrapper}>
							<Card bottle name={name} key={id} image={image} />
						</div>
					))}
					{!!addProduct && (
						<div className={styles.cardWrapper}>
							<Card addProduct onClick={() => toggleScreen()}>
								There are currently no products for {name}.
								<br />
								<br />
								Click here to add products.
							</Card>
						</div>
					)}
				</div>
			</div>
    </div>
  );
};

export default ProductSidebar;
