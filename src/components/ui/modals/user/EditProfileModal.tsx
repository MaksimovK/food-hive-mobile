import React from 'react'
import EditProfileForm, {
	IEditProfileFormProps
} from '../../forms/user/EditProfileForm'
import Modal, { IModalProps } from '../Modal'

export interface IEditProfileModalProps
	extends Omit<IModalProps, 'title'>,
		Pick<IEditProfileFormProps, 'user'> {
	onSuccess: () => void
}

export default function EditProfileModal({
	visible,
	onClose,
	user,
	onSuccess
}: IEditProfileModalProps) {
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
			title='Редактирование профиля'
		>
			<EditProfileForm
				user={user}
				onSuccess={handleSuccess}
			/>
		</Modal>
	)
}
