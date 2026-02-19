import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider className='flex-1'>{children}</SafeAreaProvider>
		</QueryClientProvider>
	)
}
