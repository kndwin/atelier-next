import styles from './styles.module.scss'

const Textarea = (props) => {
	const { cols=30, rows=10, placeholder, className, ...newProps } = props
	return (
		<textarea
			{...newProps}
			placeholder={placeholder}
			className={`${styles.textarea} ${className}`}
			name=""
			cols={cols}
			rows={rows}
		/>
	)
}

export default Textarea
