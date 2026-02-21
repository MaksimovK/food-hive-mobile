import { COLORS } from '@/constants/colors.constant'
import { useIsDark, useTheme } from '@/store/theme.store'
import cn from 'clsx'
import { type PropsWithChildren } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayout {
	className?: string
}

export default function Layout({
	children,
	className
}: PropsWithChildren<ILayout>) {
	const { top } = useSafeAreaInsets()
	const isDark = useIsDark()
	const theme = useTheme()

	return (
		<View
			style={{ backgroundColor: COLORS.background[theme], flex: 1 }}
			className={cn(`flex-1 px-4`, className)}
		>
			<View
				style={{
					height: top,
					backgroundColor: COLORS.background[theme]
				}}
				className='w-full'
			/>
			<StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

			<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
		</View>
	)
}
