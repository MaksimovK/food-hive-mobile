import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import Text from '../Text'

export interface IInputProps extends TextInputProps {
	label?: string
	error?: string
	containerClassName?: string
}

export default function Input({
	label,
	error,
	containerClassName,
	className,
	...props
}: IInputProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<View className={containerClassName}>
			{label && (
				<Text
					size='sm'
					weight='medium'
					className='mb-2 ml-2'
				>
					{label}
				</Text>
			)}

			<TextInput
				className={cn(`px-4 py-3 rounded-2xl text-base border`, className)}
				style={{
					backgroundColor: COLORS.surface[themeColorKey],
					borderColor: error
						? COLORS.error[themeColorKey]
						: COLORS.border[themeColorKey],
					color: error
						? COLORS.error[themeColorKey]
						: COLORS.text.primary[themeColorKey]
				}}
				placeholderTextColor={COLORS.text.disabled[themeColorKey]}
				selectionColor={COLORS.primary[themeColorKey]}
				autoCapitalize='none'
				autoCorrect={false}
				{...props}
			/>

			{error && (
				<Text
					size='xs'
					className='mt-1 ml-2'
					style={{ color: COLORS.error[themeColorKey] }}
				>
					{error}
				</Text>
			)}
		</View>
	)
}
