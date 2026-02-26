import { homeService } from '@/services'
import { useQuery } from '@tanstack/react-query'

export function useFetchHome() {
	return useQuery({
		queryKey: ['home'],
		queryFn: () => homeService.getHome()
	})
}
