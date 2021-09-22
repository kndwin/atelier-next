import styles from "./styles.module.scss";
import Marquee from 'react-fast-marquee';
import {customersVar, newsVar} from "graphql/reactiveVar";

const Banner = (props) => {
	const { product, customer, customerTitle, news } = props;
	const { customer: { name } } = customersVar()
	return (
		<div className={styles.banner}>
			{customerTitle && (
				<p className={styles.customerTitle}>
					<span className={styles.title}>Customers</span>
				</p>
			)}
			{!!customer && (
				<p className={styles.customer}>
					<span className={styles.title}>Customer: </span>
					{name}
				</p>
			)}
			{!!product && (
				<p className={styles.product}>
					<span className={styles.title}>Product: </span>
					{product}
				</p>
			)}
			{!!news && (
				<div className={styles.newsWrapper}>
					<Marquee pauseOnHover gradient={false}>
						<p className={styles.newsUpdate}>
							News Update:
						</p>
						{newsVar().map(({ title, url}) => (
							<div className={styles.new}>
								<p className={styles.title}>{title} - </p>
								<a className={styles.readButton} href={url}>read</a>
							</div>
						))}
					</Marquee>
				</div>
			)}
		</div>
	);
};

export default Banner;
