import { errorCatch } from '@/api/error'
import { toastError, toastSuccess } from '@/components/ui/toast/toast-show'
import { userService } from '@/services'
import { useUpdateUser } from '@/store'
import { IUpdateProfileRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useUpdateProfile() {
	const updateUser = useUpdateUser()

	return useMutation({
		mutationFn: (data: IUpdateProfileRequest) =>
			userService.updateProfile(data),
		onSuccess: data => {
			updateUser(data)
			toastSuccess('Профиль обновлён')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useUploadAvatar() {
	const updateUser = useUpdateUser()

	return useMutation({
		mutationFn: (file: FormData) => userService.uploadAvatar(file),
		onSuccess: data => {
			updateUser(data)
			toastSuccess('Аватарка загружена')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useRemoveAvatar() {
	const updateUser = useUpdateUser()

	return useMutation({
		mutationFn: () => userService.removeAvatar(),
		onSuccess: data => {
			updateUser(data)
			toastSuccess('Аватарка удалена')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}
