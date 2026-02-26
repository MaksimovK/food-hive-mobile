import { productService } from '@/services'
import { useQuery } from '@tanstack/react-query'

export function useFetchProduct(id: string) {
	return useQuery({
		queryKey: ['product', id],
		queryFn: () => productService.getProductById(id),
		enabled: !!id
	})
}

export function useSearchProducts(query: string) {
	return useQuery({
		queryKey: ['products', query],
		queryFn: () => productService.searchProducts(query),
		enabled: !!query
	})
}
