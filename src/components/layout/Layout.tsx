import { COLORS } from '@/constants/colors.constant'
import { useThemeMode } from '@/hooks/useThemeMode'
import cn from 'clsx'
import { type PropsWithChildren } from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayout {
	className?: string
}

export default function Layout({
	children,
	className
}: PropsWithChildren<ILayout>) {
	const { top } = useSafeAreaInsets()
	const { isDark } = useThemeMode()
	const themeColorKey = isDark ? 'dark' : 'light'

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
