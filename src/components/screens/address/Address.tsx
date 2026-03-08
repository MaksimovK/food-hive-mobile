import Layout from '@/components/layout/Layout'
import { Scroll, Title } from '@/components/ui'
import React from 'react'
import { View } from 'react-native'

export default function AddressScreen() {
	return (
		<Layout>
			<Scroll>
				<View className='flex-1 items-center justify-center py-8'>
					<Title title='Адреса доставки' />
				</View>
			</Scroll>
		</Layout>
	)
}
