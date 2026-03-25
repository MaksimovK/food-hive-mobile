import { daDataService } from '@/services'
import { IDaDataRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useFetchAddressSuggestions() {
	return useMutation({
		mutationKey: ['dadata-addresses'],
		mutationFn: (data: IDaDataRequest) => daDataService.getAddresses(data)
	})
}
