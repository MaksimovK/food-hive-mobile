import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

export function useFetchProduct(id: string) {
	return useQuery({
		queryKey: ['product', id],
		queryFn: () => productService.getProductById(id),
		enabled: !!id
	})
}
