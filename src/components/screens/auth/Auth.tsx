import Layout from '@/components/layout/Layout'
import { LoginForm, RegisterForm, Scroll } from '@/components/ui'
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
