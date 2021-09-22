import {Dropdown, Textarea, Button } from 'components'
import {customersVar, productVar} from 'graphql/reactiveVar';
import styles from './styles.module.scss'
import Image from 'public/svg/image.svg'
import Map from 'public/svg/map-icon.svg'
import Checkbox from 'components/Common/Checkbox';

const UpdateProductEvent = (props) => {
	const options = [
	{title: 'Option 1'}, {title: 'Option 2'}, 
	{title: 'Option 1'}, {title: 'Option 2'}, 
	{title: 'Option 1'}, {title: 'Option 2'}, 
	{title: 'Option 1'}, {title: 'Option 2'}, 
];
	const { customer: {name: brand}} = customersVar();
	const { product: {name: product}} = productVar();
	return (
		<div 
      onClick={(e) => {
        e.stopPropagation();
      }}
			className={styles.productEvent}>
			<div className={styles.chatInfo}>
				<div className={styles.stats}>
					<div className={styles.statWrapper}>
						<p className={styles.title}>Brand</p>
						<p className={styles.stat}>{brand}</p>
					</div>
					<div className={styles.statWrapper}>
						<p className={styles.title}>Product</p>
						<p className={styles.stat}>{product}</p>
					</div>
					<div className={styles.statWrapper}>
						<p className={styles.title}>Component</p>
						<p className={styles.stat}>Primary Packaging</p>
					</div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.flexBetween}>
						<div className={styles.bold}>DELAY</div>
						<Checkbox />
					</div>
					<Dropdown size="small" placeholder="ESTIMATED DAYS" options={options} disabled />
					<div className={styles.flex}>
						<Image className={styles.icon} />
						<Map className={styles.icon} />
					</div>
				</div>
			</div>
			<div className={styles.chatInput}>
				<Dropdown placeholder='CLICK DROP DOWN FOR ACTION' options={options} />
				<Textarea placeholder="Type here..." style={{ height: "100%"}}/>
				<div className={styles.flexEnd}>
					<Button size="small" width="13em" align="center">
						Submit
					</Button>
				</div>
			</div>
		</div>
	)
}

export default UpdateProductEvent
