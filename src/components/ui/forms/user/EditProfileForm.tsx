import {
	Input,
	PasswordInput,
	PhoneInput,
	PrimaryButton
} from '@/components/ui'
import { PASSWORD_REGEX, PHONE_REGEX } from '@/constants'
import { useUpdateProfile } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const editProfileSchema = z
	.object({
		email: z.string().email('Некорректный формат email'),
		name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
		phone: z
			.string()
			.regex(
				PHONE_REGEX,
				'Неверный формат телефона. Пример: +7 (999) 123 45-67'
			)
			.optional()
			.or(z.literal('')),
		currentPassword: z.string(),
		newPassword: z
			.string()
			.min(8, 'Пароль должен быть не менее 8 символов')
			.regex(
				PASSWORD_REGEX,
				'Пароль должен содержать: заглавные буквы, строчные буквы, цифры и спецсимволы (@$!%*?&)'
			)
			.optional()
			.or(z.literal(''))
	})
	.refine(
		data => {
			const hasCurrentPassword = !!data.currentPassword
			const hasNewPassword = !!data.newPassword
			return (
				(hasCurrentPassword && hasNewPassword) ||
				(!hasCurrentPassword && !hasNewPassword)
			)
		},
		{
			message: 'Для смены пароля заполните оба поля',
			path: ['currentPassword']
		}
	)

type EditProfileFormData = z.infer<typeof editProfileSchema>

export interface IEditProfileFormProps {
	user: {
		email: string
		name: string | null
		phone: string | null
	}
	onSuccess: () => void
}

export default function EditProfileForm({
	user,
	onSuccess
}: IEditProfileFormProps) {
	const { mutate: updateProfile, isPending } = useUpdateProfile()

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<EditProfileFormData>({
		resolver: zodResolver(editProfileSchema),
		mode: 'onChange',
		defaultValues: {
			email: user.email,
			name: user.name || '',
			phone: user.phone || '',
			currentPassword: '',
			newPassword: ''
		}
	})

	useEffect(() => {
		reset({
			email: user.email,
			name: user.name || '',
			phone: user.phone || '',
			currentPassword: '',
			newPassword: ''
		})
	}, [user, reset])

	const onSubmit = useCallback(
		(data: EditProfileFormData) => {
			const updateData: {
				name?: string | null
				phone?: string | null
				currentPassword?: string
				newPassword?: string
			} = {
				name: data.name || null,
				phone: data.phone || null
			}

			if (data.currentPassword && data.newPassword) {
				updateData.currentPassword = data.currentPassword
				updateData.newPassword = data.newPassword
			}

			updateProfile(updateData, {
				onSuccess: () => {
					onSuccess()
				}
			})
		},
		[updateProfile, onSuccess]
	)

	return (
		<View className='flex-col gap-4 p-4'>
			<Controller
				control={control}
				name='email'
				render={({ field: { onChange, value } }) => (
					<Input
						label='Email'
						placeholder='Введите email'
						value={value}
						onChangeText={onChange}
						error={errors.email?.message}
						keyboardType='email-address'
						autoCapitalize='none'
						disabled
					/>
				)}
			/>

			<Controller
				control={control}
				name='name'
				render={({ field: { onChange, value } }) => (
					<Input
						label='Имя'
						placeholder='Введите имя'
						value={value}
						onChangeText={onChange}
						error={errors.name?.message}
					/>
				)}
			/>

			<Controller
				control={control}
				name='phone'
				render={({ field: { onChange, value } }) => (
					<PhoneInput
						label='Телефон'
						value={value}
						onChangeText={onChange}
						error={errors.phone?.message}
					/>
				)}
			/>

			<Controller
				control={control}
				name='currentPassword'
				render={({ field: { onChange, value } }) => (
					<PasswordInput
						label='Текущий пароль (для смены)'
						placeholder='Введите текущий пароль'
						value={value}
						onChangeText={onChange}
						error={errors.currentPassword?.message}
					/>
				)}
			/>

			<Controller
				control={control}
				name='newPassword'
				render={({ field: { onChange, value } }) => (
					<PasswordInput
						label='Новый пароль'
						placeholder='Введите новый пароль'
						value={value}
						onChangeText={onChange}
						error={errors.newPassword?.message}
					/>
				)}
			/>

			<PrimaryButton
				className='mt-2'
				isLoading={isPending}
				disabled={isPending}
				onPress={handleSubmit(onSubmit)}
			>
				Сохранить изменения
			</PrimaryButton>
		</View>
	)
}
