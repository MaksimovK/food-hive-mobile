import { errorCatch } from '@/api/error'
import { toastError, toastSuccess } from '@/components/ui/toast/toast-show'
import { userService } from '@/services'
import { useUpdateUser } from '@/store'
import { UpdateProfileRequest } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateProfile() {
	const updateUser = useUpdateUser()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (dto: UpdateProfileRequest) => userService.updateProfile(dto),
		onSuccess: data => {
			updateUser(data)
			queryClient.setQueryData(['profile'], data)
			toastSuccess('Профиль обновлен')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}
