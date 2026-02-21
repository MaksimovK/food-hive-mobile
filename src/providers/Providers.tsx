import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ThemeProvider from './theme/ThemeProvider'

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
			<SafeAreaProvider className='flex-1'>
				<ThemeProvider>{children}</ThemeProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}
