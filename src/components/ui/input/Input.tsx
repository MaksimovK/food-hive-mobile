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
	disabled?: boolean
}

export default function Input({
	label,
	error,
	containerClassName,
	className,
	disabled,
	...props
}: IInputProps) {
	const { themeColorKey } = useThemeMode()

	const isError = !!error
	const isDisabled = !!disabled

	const textColor = isDisabled
		? COLORS.text.disabled[themeColorKey]
		: isError
		? COLORS.error[themeColorKey]
		: COLORS.text.primary[themeColorKey]

	const borderColor = isError
		? COLORS.error[themeColorKey]
		: COLORS.border[themeColorKey]

	const backgroundColor = isDisabled
		? COLORS.disabled.background[themeColorKey]
		: COLORS.surface[themeColorKey]

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
					backgroundColor,
					borderColor,
					color: textColor
				}}
				placeholderTextColor={COLORS.text.disabled[themeColorKey]}
				selectionColor={COLORS.primary[themeColorKey]}
				autoCapitalize='none'
				autoCorrect={false}
				editable={!isDisabled}
				{...props}
			/>

			{isError && (
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
