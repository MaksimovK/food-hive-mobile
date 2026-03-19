import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { formatDate } from '@/utils'
import DateTimePicker, {
	DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import cn from 'clsx'
import { Calendar, X } from 'lucide-react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { Platform, TextInput, View } from 'react-native'
import Button from '../buttons/Button'
import IconButton from '../buttons/icon/IconButton'
import Text from '../Text'

export interface IDatePickerInputProps {
	label?: string
	value: string
	onChangeText: (text: string) => void
	error?: string
	containerClassName?: string
	placeholder?: string
	disabled?: boolean
	minimumDate?: Date
	maximumDate?: Date
}

export default function DatePickerInput({
	label,
	value,
	onChangeText,
	error,
	containerClassName,
	placeholder = 'ДД-ММ-ГГГГ',
	disabled,
	minimumDate = new Date(1900, 0, 1),
	maximumDate = new Date()
}: IDatePickerInputProps) {
	const { themeColorKey } = useThemeMode()
	const [showPicker, setShowPicker] = useState(false)

	const parsedDate = useMemo(() => {
		if (!value) return null

		const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/)
		if (!match) return null

		const day = Number(match[1])
		const month = Number(match[2])
		const year = Number(match[3])

		const date = new Date(Date.UTC(year, month - 1, day))

		if (
			date.getUTCFullYear() !== year ||
			date.getUTCMonth() !== month - 1 ||
			date.getUTCDate() !== day
		) {
			return null
		}

		return date
	}, [value])

	const displayValue = useMemo(() => {
		return parsedDate ? formatDate(parsedDate, 'long') : value
	}, [parsedDate, value])

	const handleDateChange = useCallback(
		(event: DateTimePickerEvent, selectedDate?: Date) => {
			const { type } = event

			if (Platform.OS === 'android') {
				setShowPicker(false)
			}

			if (type === 'set' && selectedDate) {
				const formattedDate = formatDate(selectedDate, 'short')
				onChangeText(formattedDate)
			} else if (Platform.OS === 'ios' && type === 'dismissed') {
				setShowPicker(false)
			}
		},
		[onChangeText]
	)

	const handlePress = useCallback(() => {
		if (!disabled) {
			setShowPicker(true)
		}
	}, [disabled])

	const handleClear = useCallback(() => {
		onChangeText('')
	}, [onChangeText])

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

	const iconColor = isError
		? COLORS.error[themeColorKey]
		: COLORS.text.secondary[themeColorKey]

	const hasValue = !!value

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

			<Button
				onPress={handlePress}
				disabled={isDisabled}
				className={cn('flex-row items-center px-4 rounded-2xl border')}
				style={{ borderColor, backgroundColor }}
				accessibilityLabel={label || 'Выберите дату'}
				accessibilityHint='Нажмите для выбора даты'
				accessibilityState={{ disabled: isDisabled }}
				accessibilityRole='button'
			>
				<Calendar
					size={18}
					color={iconColor}
					className='mr-2'
				/>

				<TextInput
					className='flex-1 text-base'
					style={{ color: textColor }}
					value={displayValue}
					placeholder={placeholder}
					placeholderTextColor={COLORS.text.disabled[themeColorKey]}
					editable={false}
					readOnly
					accessible={false}
					accessibilityLabel='Выбранная дата'
				/>

				{hasValue && !isDisabled && (
					<IconButton
						icon={X}
						size={18}
						onPress={handleClear}
						className='ml-2 p-1'
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
						iconColor={COLORS.text.disabled[themeColorKey]}
						accessibilityLabel='Очистить дату'
					/>
				)}
			</Button>

			{isError && (
				<Text
					size='xs'
					className='mt-1 ml-2'
					style={{ color: COLORS.error[themeColorKey] }}
				>
					{error}
				</Text>
			)}

			{showPicker && (
				<DateTimePicker
					value={parsedDate || new Date()}
					mode='date'
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={handleDateChange}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					locale='ru-RU'
				/>
			)}
		</View>
	)
}
