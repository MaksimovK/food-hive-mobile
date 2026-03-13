import { Input, PrimaryButton, Switch, Text } from '@/components/ui'
import { useCreateAddress, useUpdateAddress } from '@/hooks'
import { IAddress } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const addressSchema = z.object({
	label: z.string().optional().or(z.literal('')),
	street: z.string().min(1, 'Улица обязательна'),
	house: z.string().min(1, 'Дом обязателен'),
	apartment: z.string().optional().or(z.literal('')),
	entrance: z.string().optional().or(z.literal('')),
	floor: z.string().optional().or(z.literal('')),
	comment: z.string().optional().or(z.literal('')),
	isDefault: z.boolean().optional()
})

type AddressFormData = z.infer<typeof addressSchema>

export interface IAddAddressFormProps {
	address?: IAddress
	onSuccess: () => void
}

export default function AddAddressForm({
	address,
	onSuccess
}: IAddAddressFormProps) {
	const { mutate: createAddress, isPending: isCreating } = useCreateAddress()
	const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress()

	const isPending = isCreating || isUpdating
	const isEditing = !!address

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<AddressFormData>({
		resolver: zodResolver(addressSchema),
		mode: 'onChange',
		defaultValues: {
			label: '',
			street: '',
			house: '',
			apartment: '',
			entrance: '',
			floor: '',
			comment: '',
			isDefault: false
		}
	})

	useEffect(() => {
		if (address) {
			reset({
				label: address.label || '',
				street: address.street,
				house: address.house,
				apartment: address.apartment || '',
				entrance: address.entrance || '',
				floor: address.floor || '',
				comment: address.comment || '',
				isDefault: address.isDefault
			})
		} else {
			reset({
				label: '',
				street: '',
				house: '',
				apartment: '',
				entrance: '',
				floor: '',
				comment: '',
				isDefault: false
			})
		}
	}, [address, reset])

	const onSubmit = useCallback(
		(data: AddressFormData) => {
			const submitData = {
				...data,
				apartment: data.apartment || undefined,
				entrance: data.entrance || undefined,
				floor: data.floor || undefined,
				comment: data.comment || undefined
			}

			if (isEditing && address) {
				updateAddress(
					{ id: address.id, dto: submitData },
					{
						onSuccess: () => {
							onSuccess()
						}
					}
				)
			} else {
				createAddress(submitData, {
					onSuccess: () => {
						onSuccess()
					}
				})
			}
		},
		[isEditing, address, createAddress, updateAddress, onSuccess]
	)

	return (
		<View className='flex-col gap-4 p-4'>
			<Controller
				control={control}
				name='label'
				render={({ field: { onChange, value } }) => (
					<Input
						label='Название (необязательно)'
						placeholder='Например: Дом, Работа'
						value={value}
						onChangeText={onChange}
						error={errors.label?.message}
					/>
				)}
			/>

			<View className='flex-row gap-2'>
				<View className='flex-1'>
					<Controller
						control={control}
						name='street'
						render={({ field: { onChange, value } }) => (
							<Input
								label='Улица *'
								placeholder='Улица'
								value={value}
								onChangeText={onChange}
								error={errors.street?.message}
							/>
						)}
					/>
				</View>

				<View className='w-24'>
					<Controller
						control={control}
						name='house'
						render={({ field: { onChange, value } }) => (
							<Input
								label='Дом *'
								placeholder='Дом'
								value={value}
								onChangeText={onChange}
								error={errors.house?.message}
							/>
						)}
					/>
				</View>
			</View>

			<View className='flex-row gap-2 justify-between items-center'>
				<View className='flex-1'>
					<Controller
						control={control}
						name='apartment'
						render={({ field: { onChange, value } }) => (
							<Input
								label='Квартира'
								placeholder='Кв.'
								value={value}
								onChangeText={onChange}
								error={errors.apartment?.message}
							/>
						)}
					/>
				</View>

				<View className='w-1/4'>
					<Controller
						control={control}
						name='entrance'
						render={({ field: { onChange, value } }) => (
							<Input
								label='Подъезд'
								placeholder='Под.'
								value={value}
								onChangeText={onChange}
								error={errors.entrance?.message}
							/>
						)}
					/>
				</View>

				<View className='w-1/4'>
					<Controller
						control={control}
						name='floor'
						render={({ field: { onChange, value } }) => (
							<Input
								label='Этаж'
								placeholder='Эт.'
								value={value}
								onChangeText={onChange}
								error={errors.floor?.message}
							/>
						)}
					/>
				</View>
			</View>

			<Controller
				control={control}
				name='comment'
				render={({ field: { onChange, value } }) => (
					<Input
						label='Комментарий'
						placeholder='Например: код домофона 1234'
						value={value}
						onChangeText={onChange}
						error={errors.comment?.message}
						multiline
						numberOfLines={3}
					/>
				)}
			/>

			<Controller
				control={control}
				name='isDefault'
				render={({ field: { onChange, value } }) => (
					<View className='flex-row items-center justify-between'>
						<Text
							size='sm'
							weight='medium'
							className='ml-2'
						>
							Использовать {'\n'}
							как адрес по умолчанию
						</Text>
						<Switch
							value={value ?? false}
							onValueChange={onChange}
						/>
					</View>
				)}
			/>

			<PrimaryButton
				className='mt-2'
				isLoading={isPending}
				disabled={isPending}
				onPress={handleSubmit(onSubmit)}
			>
				{isEditing ? 'Сохранить изменения' : 'Добавить адрес'}
			</PrimaryButton>
		</View>
	)
}
