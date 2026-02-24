import Text from '@/components/ui/Text'
import { COLORS } from '@/constants/colors.constant'
import { useThemeMode } from '@/hooks/useThemeMode'
import { View } from 'react-native'

export interface ProductPriceProps {
	price: string
}

export default function ProductPrice({ price }: ProductPriceProps) {
	const { isDark } = useThemeMode()
	const themeColorKey = isDark ? 'dark' : 'light'

	return (
		<View
			style={{
				backgroundColor: COLORS.disabled.background[themeColorKey]
			}}
			className='px-3 py-1.5 rounded-2xl self-start'
		>
			<Text
				size='lg'
				weight='bold'
				variant='primary'
			>
				{price}
			</Text>
		</View>
	)
}
