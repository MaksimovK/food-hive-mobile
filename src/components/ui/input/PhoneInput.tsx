import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React, { useCallback } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import Text from '../Text'

export interface IPhoneInputProps extends TextInputProps {
	label?: string
	error?: string
	containerClassName?: string
}

export default function PhoneInput({
	label,
	error,
	containerClassName,
	className,
	value = '',
	onChangeText,
	...props
}: IPhoneInputProps) {
	const { themeColorKey } = useThemeMode()

	const formatPhone = useCallback((input: string): string => {
		const digits = input.replace(/\D/g, '')

		let cleanDigits = digits
		if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
			cleanDigits = cleanDigits.slice(1)
		}
		cleanDigits = cleanDigits.slice(0, 10)

		let formatted = '+7'

		if (cleanDigits.length > 0) {
			formatted += ` (${cleanDigits.slice(0, 3)}`
			if (cleanDigits.length > 3) {
				formatted += ')'
			}
		}
		if (cleanDigits.length > 3) {
			formatted += ` ${cleanDigits.slice(3, 6)}`
		}
		if (cleanDigits.length > 6) {
			formatted += ` ${cleanDigits.slice(6, 8)}`
		}
		if (cleanDigits.length > 8) {
			formatted += `-${cleanDigits.slice(8, 10)}`
		}

		return formatted
	}, [])

	const handleChangeText = useCallback(
		(text: string) => {
			const digits = text.replace(/\D/g, '')
			let cleanDigits = digits

			if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
				cleanDigits = cleanDigits.slice(1)
			}

			if (!cleanDigits) {
				onChangeText?.('')
				return
			}

			const formatted = formatPhone(text)
			onChangeText?.(formatted)
		},
		[formatPhone, onChangeText]
	)

	const digits = value.replace(/\D/g, '')
	let cleanDigits = digits
	if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
		cleanDigits = cleanDigits.slice(1)
	}
	const displayValue = cleanDigits ? formatPhone(value) : ''

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
				placeholder='+7 (___) ___ __-__'
				placeholderTextColor={COLORS.text.disabled[themeColorKey]}
				selectionColor={COLORS.primary[themeColorKey]}
				value={displayValue}
				onChangeText={handleChangeText}
				keyboardType='phone-pad'
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
