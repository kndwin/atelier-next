import styles from './styles.module.scss'

const Slider = (props) => {
	const {value} = props
	return (
		<div className={styles.sliderWrapper}>
			<input className={styles.slider} type="range" min='1' max='100' value={value} />
		</div>
	)
}

export default Slider
