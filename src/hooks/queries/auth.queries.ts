import { errorCatch } from '@/api/error'
import { toastError, toastSuccess } from '@/components/ui/toast/toast-show'
import { authService } from '@/services'
import { useLogout, useRefreshToken, useSetAuth } from '@/store'
import { LoginDto, RegisterDto } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useRegister() {
	const setAuth = useSetAuth()

	return useMutation({
		mutationFn: (dto: RegisterDto) => authService.register(dto),
		onSuccess: data => {
			setAuth({
				user: data.user,
				accessToken: data.accessToken,
				refreshToken: data.refreshToken
			})
			toastSuccess('Вы зарегистрировались')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useLogin() {
	const setAuth = useSetAuth()

	return useMutation({
		mutationFn: (dto: LoginDto) => authService.login(dto),
		onSuccess: data => {
			setAuth({
				user: data.user,
				accessToken: data.accessToken,
				refreshToken: data.refreshToken
			})
			toastSuccess('Вы вошли в аккаунт')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useLogoutMutation() {
	const refreshToken = useRefreshToken()
	const logout = useLogout()

	return useMutation({
		mutationFn: () => {
			if (refreshToken) {
				return authService.logout(refreshToken)
			}
			return Promise.resolve({ message: 'Logged out' })
		},
		onSuccess: () => {
			logout()
			toastSuccess('Вы вышли из аккаунта')
		}
	})
}
