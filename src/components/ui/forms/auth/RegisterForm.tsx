import { AuthToggle } from '@/components/elements'
import {
	DatePickerInput,
	Input,
	PasswordInput,
	PhoneInput,
	PrimaryButton,
	Title
} from '@/components/ui'
import { NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '@/constants'
import { useRegister } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const registerSchema = z.object({
	email: z.string().email('Некорректный формат email'),
	password: z
		.string()
		.min(8, 'Пароль должен быть не менее 8 символов')
		.regex(
			PASSWORD_REGEX,
			'Пароль должен содержать: заглавные буквы, строчные буквы, цифры и спецсимволы (@$!%*?&)'
		),
	name: z
		.string()
		.min(2, 'Имя должно быть не менее 2 символов')
		.regex(NAME_REGEX, 'Имя может содержать только буквы, пробелы и дефисы'),
	phone: z
		.string()
		.regex(PHONE_REGEX, 'Неверный формат телефона. Пример: +7 (999) 123 45-67')
		.or(z.literal('')),
	dateOfBirth: z
		.string()
		.regex(
			/^\d{2}-\d{2}-\d{4}$/,
			'Дата рождения должна быть в формате dd-mm-yyyy (например, 15-05-1990)'
		)
		.refine(
			dateStr => {
				if (!dateStr) return false
				const [day, month, year] = dateStr.split('-').map(Number)
				const date = new Date(Date.UTC(year, month - 1, day))
				return (
					date.getUTCFullYear() === year &&
					date.getUTCMonth() === month - 1 &&
					date.getUTCDate() === day
				)
			},
			{
				message: 'Некорректная дата'
			}
		)
		.refine(
			dateStr => {
				if (!dateStr) return false
				const [day, month, year] = dateStr.split('-').map(Number)
				const date = new Date(Date.UTC(year, month - 1, day))
				const today = new Date()
				let age = today.getUTCFullYear() - date.getUTCFullYear()
				const monthDiff = today.getUTCMonth() - date.getUTCMonth()
				const dayDiff = today.getUTCDate() - date.getUTCDate()

				if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
					age--
				}
				return age >= 14
			},
			{
				message: 'Вам должно быть не менее 14 лет'
			}
		)
})

type RegisterFormData = z.infer<typeof registerSchema>

export interface IRegisterFormProps {
	onSuccess: () => void
	onGoToLogin: () => void
}

export default function RegisterForm({
	onSuccess,
	onGoToLogin
}: IRegisterFormProps) {
	const { mutate: register, isPending } = useRegister()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			name: '',
			phone: '',
			dateOfBirth: ''
		}
	})

	const onSubmit = useCallback(
		(data: RegisterFormData) => {
			register(
				{
					email: data.email,
					password: data.password,
					name: data.name,
					phone: data.phone,
					dateOfBirth: data.dateOfBirth
				},
				{
					onSuccess: () => {
						onSuccess()
					}
				}
			)
		},
		[register, onSuccess]
	)

	return (
		<View className='flex-col gap-4 py-4'>
			<Title
				title='Регистрация'
				align='center'
			/>

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
					/>
				)}
			/>

			<Controller
				control={control}
				name='password'
				render={({ field: { onChange, value } }) => (
					<PasswordInput
						label='Пароль'
						placeholder='Введите пароль'
						value={value}
						onChangeText={onChange}
						error={errors.password?.message}
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
				name='dateOfBirth'
				render={({ field: { onChange, value } }) => (
					<DatePickerInput
						label='Дата рождения'
						value={value}
						onChangeText={onChange}
						error={errors.dateOfBirth?.message}
						placeholder='ДД-ММ-ГГГГ'
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

			<PrimaryButton
				className='mt-2'
				isLoading={isPending}
				disabled={isPending}
				onPress={handleSubmit(onSubmit)}
			>
				Зарегистрироваться
			</PrimaryButton>

			<AuthToggle
				questionText='Уже есть аккаунт?'
				buttonText='Войти'
				onPress={onGoToLogin}
			/>
		</View>
	)
}
