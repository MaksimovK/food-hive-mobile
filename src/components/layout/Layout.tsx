import cn from 'clsx'
import type { PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayout {
	className?: string
}

export default function Layout({
	children,
	className
}: PropsWithChildren<ILayout>) {
	const { top } = useSafeAreaInsets()

	return (
		<View className={cn(`flex-1 bg-white px-4`, className)}>
			<View
				style={{ height: top }}
				className='bg-white w-full'
			/>
			<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
		</View>
	)
}
