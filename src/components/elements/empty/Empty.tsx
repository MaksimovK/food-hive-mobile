import Layout from '@/components/layout/Layout'
import { Text, Title } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { View } from 'react-native'

export interface IEmptyProps {
	title: string
	description?: string
	icon?: React.ComponentType<{ size: number; color: string }>
}

export default function Empty({ title, description, icon: Icon }: IEmptyProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<Layout className='items-center justify-center'>
			<View
				className='p-4 rounded-full mb-4'
				style={{
					backgroundColor: COLORS.surface[themeColorKey]
				}}
			>
				{Icon && (
					<Icon
						size={64}
						color={COLORS.text.disabled[themeColorKey]}
					/>
				)}
			</View>

			<Title
				title={title}
				align='center'
			/>

			{description && (
				<Text
					size='base'
					className='mt-2 text-center'
					style={{ color: COLORS.text.secondary[themeColorKey] }}
				>
					{description}
				</Text>
			)}
		</Layout>
	)
}
