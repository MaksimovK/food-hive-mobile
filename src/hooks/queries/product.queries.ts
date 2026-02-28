import { PRODUCTS_PER_PAGE } from '@/constants'
import { productService } from '@/services'
import {
	infiniteQueryOptions,
	useInfiniteQuery,
	useQuery
} from '@tanstack/react-query'

export function useFetchProduct(id: string) {
	return useQuery({
		queryKey: ['product', id],
		queryFn: () => productService.getProductById(id),
		enabled: !!id
	})
}

export function useSearchProducts(query: string) {
	const options = infiniteQueryOptions({
		queryKey: ['products', query],
		queryFn: ({ pageParam = 0 }) =>
			productService.searchProducts({
				query,
				limit: PRODUCTS_PER_PAGE,
				offset: pageParam
			}),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < PRODUCTS_PER_PAGE) {
				return undefined
			}
			return allPages.length * PRODUCTS_PER_PAGE
		},
		select: data => data.pages.flatMap(page => page),
		enabled: !!query
	})

	return useInfiniteQuery(options)
}
