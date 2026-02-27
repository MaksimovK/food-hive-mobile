import { API_URL } from '@/config'
import { authService } from '@/services'
import { useAuthStore } from '@/store'
import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'

export const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)
axiosWithAuth.interceptors.request.use(config => {
	const accessToken = useAuthStore.getState().accessToken

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		const removeToken = useAuthStore.getState().logout

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true

			const state = useAuthStore.getState()
			const refreshToken = state.refreshToken

			if (refreshToken) {
				try {
					const response = await authService.refreshToken(refreshToken)
					const { accessToken, refreshToken: newRefreshToken } = response

					state.setAuth({
						user: state.user!,
						accessToken,
						refreshToken: newRefreshToken
					})

					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${accessToken}`
					}
					return axiosWithAuth(originalRequest)
				} catch (refreshError) {
					state.logout()
					return Promise.reject(refreshError)
				}
			}
			try {
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeToken()
			}
		}

		return Promise.reject(error)
	}
)

export { axiosClassic, axiosWithAuth }
