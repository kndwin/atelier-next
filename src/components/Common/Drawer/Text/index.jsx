import styles from "./styles.module.scss";
import Cloud from "public/svg/cloud.svg";
import Bottle from 'public/svg/bottle.svg';

const Text = (props) => {
  const { children, cloud, bottle, small } = props;
  return (
		<div className={`${styles.textWrapper} ${!!small ? styles.small : ""}`}>
      {cloud && <Cloud className={styles.cloud} />}
			{bottle && (
				<div className={`${styles.bottleWrapper} ${styles.rotate}`}>
					<Bottle className={styles.bottle} />
				</div>
			)}
			<p className={styles.drawerMessage}>{children}</p>
		</div>
	);
};

export default Text;
