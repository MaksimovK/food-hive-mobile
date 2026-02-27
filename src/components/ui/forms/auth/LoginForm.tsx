import { AuthToggle } from '@/components/elements'
import { Input, PasswordInput, PrimaryButton, Title } from '@/components/ui'
import { useLogin } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email('Некорректный формат email'),
	password: z.string().min(8, 'Пароль должен быть не менее 8 символов')
})

type LoginFormData = z.infer<typeof loginSchema>

export interface ILoginFormProps {
	onSuccess: () => void
	onGoToRegister: () => void
}

export default function LoginForm({
	onSuccess,
	onGoToRegister
}: ILoginFormProps) {
	const { mutate: login, isPending } = useLogin()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = useCallback(
		(data: LoginFormData) => {
			login(data, {
				onSuccess: () => {
					onSuccess()
				}
			})
		},
		[login, onSuccess]
	)

	return (
		<View className='flex-col gap-4 py-4'>
			<Title
				title='Вход'
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

			<PrimaryButton
				className='mt-2'
				isLoading={isPending}
				disabled={isPending}
				onPress={handleSubmit(onSubmit)}
			>
				Войти
			</PrimaryButton>

			<AuthToggle
				questionText='Нет аккаунта?'
				buttonText='Зарегистрироваться'
				onPress={onGoToRegister}
			/>
		</View>
	)
}
