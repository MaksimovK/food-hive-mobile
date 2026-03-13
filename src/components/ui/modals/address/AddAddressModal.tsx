import React from 'react'
import AddAddressForm, {
	IAddAddressFormProps
} from '../../forms/address/AddAddressForm'
import Modal, { IModalProps } from '../Modal'

export interface IAddAddressModalProps
	extends Omit<IModalProps, 'title'>,
		Pick<IAddAddressFormProps, 'address'> {
	onSuccess: () => void
}

export default function AddAddressModal({
	visible,
	onClose,
	address,
	onSuccess
}: IAddAddressModalProps) {
	const handleClose = () => {
		onClose()
	}

	const handleSuccess = () => {
		onSuccess()
		handleClose()
	}

	return (
		<Modal
			visible={visible}
			onClose={handleClose}
			title={address ? 'Редактировать адрес' : 'Новый адрес'}
		>
			<AddAddressForm
				address={address}
				onSuccess={handleSuccess}
			/>
		</Modal>
	)
}
