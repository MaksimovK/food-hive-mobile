import { Text, Title } from '@/components/ui'
import React from 'react'
import { View } from 'react-native'

export interface IProductDescriptionProps {
	name: string
	description: string | null
}

export default function ProductDescription({
	name,
	description
}: IProductDescriptionProps) {
	return (
		<View className='my-4 flex-col gap-2'>
			<Title title={name} />

			<View className='mb-2'>
				<Text
					variant='primary'
					size='base'
					weight='semibold'
				>
					Описание
				</Text>

				{description && (
					<Text
						variant='secondary'
						size='base'
					>
						{description}
					</Text>
				)}
			</View>
		</View>
	)
}
