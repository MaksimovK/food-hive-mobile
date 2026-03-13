import { errorCatch } from '@/api/error'
import { toastError, toastSuccess } from '@/components/ui'
import { addressService } from '@/services'
import { ICreateAddressRequest, IUpdateAddressRequest } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useAddresses() {
	return useQuery({
		queryKey: ['addresses'],
		queryFn: () => addressService.findAll()
	})
}

export function useCreateAddress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (dto: ICreateAddressRequest) => addressService.create(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] })
			toastSuccess('Адрес добавлен')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useUpdateAddress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: IUpdateAddressRequest }) =>
			addressService.update(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] })
			toastSuccess('Адрес обновлён')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useDeleteAddress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => addressService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] })
			toastSuccess('Адрес удалён')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}

export function useSetDefaultAddress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => addressService.setDefault(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] })
			toastSuccess('Адрес установлен по умолчанию')
		},
		onError: error => {
			toastError(errorCatch(error))
		}
	})
}
