import Layout from '@/components/layout/Layout'
import { BackButton, LoginForm, RegisterForm, Scroll } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import React, { useCallback, useState } from 'react'

export type AuthType = 'login' | 'register'

export default function Auth() {
	const navigation = useTypedNavigation()
	const [authType, setAuthType] = useState<AuthType>('login')

	const handleSuccess = useCallback(() => {
		navigation.popToTop()
	}, [navigation])

	const handleGoToLogin = useCallback(() => {
		setAuthType('login')
	}, [])

	const handleGoToRegister = useCallback(() => {
		setAuthType('register')
	}, [])

	return (
		<Layout>
			<Scroll contentContainerClassName='flex-1 justify-center'>
				<BackButton
					size={30}
					className='absolute top-4 left-0'
				/>

				{authType === 'login' ? (
					<LoginForm
						onSuccess={handleSuccess}
						onGoToRegister={handleGoToRegister}
					/>
				) : (
					<RegisterForm
						onSuccess={handleSuccess}
						onGoToLogin={handleGoToLogin}
					/>
				)}
			</Scroll>
		</Layout>
	)
}
