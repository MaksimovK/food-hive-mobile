import { errorCatch } from '@/api/error'
import { toastError, toastSuccess } from '@/components/ui/toast/toast-show'
import { userService } from '@/services'
import { useUpdateUser } from '@/store'
import { IUpdateProfileRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useUpdateProfile() {
	const updateUser = useUpdateUser()

	return useMutation({
		mutationFn: (dto: IUpdateProfileRequest) => userService.updateProfile(dto),
		onSuccess: data => {
			updateUser(data)
			toastSuccess('Профиль обновлён')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}
