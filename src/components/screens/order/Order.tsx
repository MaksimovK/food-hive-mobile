import {
	AddressElement,
	InfoFooter,
	PaymentMethodElement,
	ProductElement
} from '@/components/elements'
import Layout from '@/components/layout/Layout'
import {
	AddAddressModal,
	BackButton,
	Container,
	Input,
	Loader,
	PrimaryButton,
	Scroll,
	Separator,
	Text,
	Title,
	toastError
} from '@/components/ui'
import { useCheckoutData, useCreateOrder, useTypedNavigation } from '@/hooks'
import { EnumPaymentMethod, IAddress } from '@/types'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

export default function OrderScreen() {
	const navigation = useTypedNavigation()
	const { data, isLoading, refetch } = useCheckoutData()
	const { mutate: createOrder, isPending } = useCreateOrder()

	const [isAddModalVisible, setIsAddModalVisible] = useState(false)
	const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null)
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<EnumPaymentMethod | null>(null)
	const [orderComment, setOrderComment] = useState<string>('')

	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [refetch])
	)

	useLayoutEffect(() => {
		if (data?.addresses) {
			const defaultAddress = data.addresses.find(a => a.isDefault)
			setSelectedAddress(defaultAddress || data.addresses[0] || null)
		}

		if (data?.paymentMethods?.length && !selectedPaymentMethod) {
			setSelectedPaymentMethod(data.paymentMethods[0].value)
		}
	}, [data?.addresses, data?.paymentMethods, selectedPaymentMethod])

	const handleOpenAddModal = useCallback(() => {
		setIsAddModalVisible(true)
	}, [])

	const handleCloseAddModal = useCallback(() => {
		setIsAddModalVisible(false)
	}, [])

	const validationError = useMemo(() => {
		if (!selectedAddress) return 'Выберите адрес доставки'
		if (!selectedPaymentMethod) return 'Выберите способ оплаты'
		return null
	}, [selectedAddress, selectedPaymentMethod])

	const renderedAddresses = useMemo(
		() =>
			data?.addresses.map(address => (
				<AddressElement
					key={address.id}
					address={address}
					isSelected={selectedAddress?.id === address.id}
					onSelect={setSelectedAddress}
				/>
			)),
		[data?.addresses, selectedAddress]
	)

	const renderedPaymentMethods = useMemo(
		() =>
			data?.paymentMethods.map(method => (
				<PaymentMethodElement
					key={method.value}
					paymentMethod={method}
					isSelected={selectedPaymentMethod === method.value}
					onSelect={setSelectedPaymentMethod}
				/>
			)),
		[data?.paymentMethods, selectedPaymentMethod]
	)

	const renderedCartItems = useMemo(
		() =>
			data?.cartItems.map(item => (
				<React.Fragment key={item.id}>
					<ProductElement product={item} />
					<Separator />
				</React.Fragment>
			)),
		[data?.cartItems]
	)

	const handleCreateOrder = useCallback(() => {
		if (validationError) {
			toastError(validationError)
			return
		}

		if (!selectedAddress || !selectedPaymentMethod) {
			return
		}

		createOrder(
			{
				addressId: selectedAddress.id,
				paymentMethod: selectedPaymentMethod,
				orderComment: orderComment || undefined
			},
			{
				onSuccess: () => {
					navigation.goBack()
				}
			}
		)
	}, [
		selectedAddress,
		selectedPaymentMethod,
		orderComment,
		createOrder,
		navigation,
		validationError
	])

	if (isLoading) return <Loader />

	if (!data) return null

	return (
		<Layout>
			<Scroll
				className='flex-col'
				contentContainerClassName='gap-4'
			>
				<View className='flex-row items-center py-4 gap-4 flex-wrap justify-between'>
					<BackButton />
					<Title title='Оформление заказа' />
				</View>

				<Container>
					<Text
						size='lg'
						weight='semibold'
					>
						Выберите адрес доставки
					</Text>

					<View className='mt-3 gap-3'>
						{data.addresses.length === 0 ? (
							<Text
								className='py-4'
								align='center'
								size='lg'
							>
								Нет адресов
							</Text>
						) : (
							renderedAddresses
						)}
					</View>

					<PrimaryButton
						className='mt-4'
						onPress={handleOpenAddModal}
					>
						Добавить новый адрес
					</PrimaryButton>
				</Container>

				<Container>
					<Text
						size='lg'
						weight='semibold'
					>
						Выберите способ оплаты
					</Text>

					<View className='mt-3 flex-row gap-3'>{renderedPaymentMethods}</View>
				</Container>

				<Container>
					<Text
						size='lg'
						weight='semibold'
					>
						Товары в заказе
					</Text>

					<View className='mt-3'>{renderedCartItems}</View>
				</Container>

				<Container>
					<Text
						size='lg'
						weight='semibold'
					>
						Комментарий к заказу (опционально)
					</Text>

					<View className='mt-3'>
						<Input
							placeholder='Введите комментарий'
							value={orderComment}
							onChangeText={setOrderComment}
							multiline
							numberOfLines={4}
							className='min-h-28'
						/>
					</View>
				</Container>

				<View className='h-28' />
			</Scroll>

			<InfoFooter
				totalProducts={data.totalProducts}
				totalPrice={data.totalPrice}
				onPress={handleCreateOrder}
				disabled={isPending}
			/>

			<AddAddressModal
				visible={isAddModalVisible}
				onClose={handleCloseAddModal}
				onSuccess={handleCloseAddModal}
			/>
		</Layout>
	)
}
