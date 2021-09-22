import {userVar} from 'graphql/reactiveVar'
import {useState} from 'react'
import styles from './styles.module.scss'

const Checkbox = (props) => {
	const { className, onClick, value, ...newProps } = props
	const { isAdmin } = userVar()
	return (
		<div  {...newProps}
			className={`${styles.wrapper} ${className}`}
			onClick={onClick ? onClick : () => setIsChecked(!isChecked)}
		>
			<div className={`${styles.circle} ${isAdmin ? styles.admin : ""}`}>
				{value  && <div className={styles.tick}/>}
			</div>
		</div>
	)
}

export default Checkbox
