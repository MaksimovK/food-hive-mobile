import { AddressCard, Empty } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import {
	AddAddressModal,
	BackButton,
	FloatingButton,
	Loader,
	Scroll,
	Title,
	toastError
} from '@/components/ui'
import { useAddresses, useDeleteAddress, useSetDefaultAddress } from '@/hooks'
import { IAddress } from '@/types'
import { MapPinHouse, Plus } from 'lucide-react-native'
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'

export default function AddressScreen() {
	const { data: addresses, isLoading } = useAddresses()
	const { mutate: deleteAddress } = useDeleteAddress()
	const { mutate: setDefaultAddress } = useSetDefaultAddress()

	const [isAddModalVisible, setIsAddModalVisible] = useState(false)
	const [editingAddress, setEditingAddress] = useState<IAddress | undefined>(
		undefined
	)

	const handleOpenAddModal = useCallback(() => {
		setIsAddModalVisible(true)
	}, [])

	const handleCloseAddModal = useCallback(() => {
		setIsAddModalVisible(false)
	}, [])

	const handleEditAddress = useCallback((address: IAddress) => {
		setEditingAddress(address)
	}, [])

	const handleCloseEditModal = useCallback(() => {
		setEditingAddress(undefined)
	}, [])

	const handleSuccess = useCallback(() => {
		setIsAddModalVisible(false)
		setEditingAddress(undefined)
	}, [])

	const handleDeleteAddress = useCallback(
		(id: string) => {
			deleteAddress(id, {
				onError: () => {
					toastError('Не удалось удалить адрес')
				}
			})
		},
		[deleteAddress]
	)

	const handleSetDefaultAddress = useCallback(
		(id: string) => {
			setDefaultAddress(id, {
				onError: () => {
					toastError('Не удалось установить адрес по умолчанию')
				}
			})
		},
		[setDefaultAddress]
	)

	if (isLoading) return <Loader />

	return (
		<Layout>
			<Scroll>
				<View className='flex-1 py-4 gap-4 pb-24'>
					<View className='flex-row items-center relative'>
						<BackButton />
						<Title
							title='Мои адреса'
							className='absolute top-0 left-1/2 -translate-x-1/2'
						/>
					</View>

					{!addresses || addresses.length === 0 ? (
						<Empty
							icon={MapPinHouse}
							title='Нет адресов'
							description='Добавьте первый адрес доставки'
						/>
					) : (
						addresses.map(address => (
							<AddressCard
								key={address.id}
								address={address}
								onEdit={handleEditAddress}
								onDelete={handleDeleteAddress}
								onSetDefault={handleSetDefaultAddress}
							/>
						))
					)}
				</View>
			</Scroll>

			<FloatingButton
				icon={Plus}
				onPress={handleOpenAddModal}
				accessibilityLabel='Добавить адрес'
			/>

			<AddAddressModal
				visible={isAddModalVisible}
				onClose={handleCloseAddModal}
				onSuccess={handleSuccess}
			/>

			{editingAddress && (
				<AddAddressModal
					visible={!!editingAddress}
					onClose={handleCloseEditModal}
					address={editingAddress}
					onSuccess={handleSuccess}
				/>
			)}
		</Layout>
	)
}
