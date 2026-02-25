import { Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { View } from 'react-native'

export interface IProductPriceProps {
	price: string
}

export default function ProductPrice({ price }: IProductPriceProps) {
	const { themeColorKey } = useThemeMode()

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
