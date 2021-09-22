import {useReactiveVar} from '@apollo/client'
import {modalVar} from 'graphql/reactiveVar'

import ProgressMap from './ProgressMap'
import NewOrder from './NewOrder'
import styles from './styles.module.scss'
import OrderAddressEdit from './OrderAddressEdit'
import CompleteOrder from './CompleteOrder'
import AddClientDetails from './AddClientDetails'
import DeleteOrder from './DeleteOrder'
import UpdateProductEvent from './UpdateProductEvent'

const Modal = (props) => {
	const { isOpen, type } = useReactiveVar(modalVar)
	return (
		<div className={`${styles.modalWrapper} ${isOpen ? '' : styles.none}`}
			onClick={()=>modalVar({...modalVar(), isOpen: false}) }
		>

			{type === 'NEW_ORDER' && <NewOrder/>}
			{type === 'DELETE_ORDER' && <DeleteOrder/>}
			{type === 'COMPLETE_ORDER' && <CompleteOrder/>}
			{type === 'UPDATE_PRODUCT_EVENT' && <UpdateProductEvent/>}

			{type === 'PROGRESS_MAP' && <ProgressMap/>}
			{type === 'ORDER_ADDRESS_EDIT' && <OrderAddressEdit/>}
			{type === 'ADD_CLIENT_DETAILS' && <AddClientDetails/>}
		</div>
	)
}

export default Modal
