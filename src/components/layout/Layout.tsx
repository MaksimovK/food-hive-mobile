import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { type PropsWithChildren } from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayoutProps {
	className?: string
}

export default function Layout({
	children,
	className
}: PropsWithChildren<ILayoutProps>) {
	const { top } = useSafeAreaInsets()
	const { isDark, themeColorKey } = useThemeMode()

	return (
		<View
			style={{
				backgroundColor: COLORS.background[themeColorKey]
			}}
			className={cn(`flex-1 px-4`, className)}
		>
			<View
				style={{
					height: top,
					backgroundColor: COLORS.background[themeColorKey]
				}}
				className='w-full'
			/>
			<StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

			{children}
		</View>
	)
}
