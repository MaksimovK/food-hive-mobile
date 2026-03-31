import { Button, Text } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { ChevronDown } from 'lucide-react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { Modal, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'

export interface ISelectOption<T extends string> {
	label: string
	value: T
}

export interface ISelectProps<T extends string> {
	label?: string
	value: T
	options: ISelectOption<T>[]
	onChange: (value: T) => void
	className?: string
	style?: ViewStyle
}

export default function Select<T extends string>({
	label,
	value,
	options,
	onChange,
	className,
	style
}: ISelectProps<T>) {
	const { themeColorKey } = useThemeMode()
	const [isOpen, setIsOpen] = useState(false)

	const selectedOption = useMemo(
		() => options.find(option => option.value === value),
		[options, value]
	)

	const handleOpen = useCallback(() => {
		setIsOpen(true)
	}, [])

	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	const handleSelect = useCallback(
		(selectedValue: T) => {
			onChange(selectedValue)
			handleClose()
		},
		[onChange, handleClose]
	)

	const renderedOptions = useMemo(
		() =>
			options.map((option, index) => {
				const isSelected = option.value === value
				const isLast = index === options.length - 1

				return (
					<Button
						key={option.value}
						onPress={() => handleSelect(option.value)}
						className='px-4 py-4 border-b'
						style={{
							backgroundColor: isSelected
								? COLORS.primary[themeColorKey] + '15'
								: COLORS.surface[themeColorKey],
							borderColor: isLast ? 'transparent' : COLORS.border[themeColorKey]
						}}
					>
						<Text
							weight={isSelected ? 'semibold' : 'normal'}
							style={{
								color: isSelected
									? COLORS.primary[themeColorKey]
									: COLORS.text.primary[themeColorKey]
							}}
						>
							{option.label}
						</Text>
					</Button>
				)
			}),
		[options, value, themeColorKey, handleSelect]
	)

	return (
		<View
			className={className}
			style={style}
		>
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
				onPress={handleOpen}
				className='flex-row items-center justify-between px-4 py-3 rounded-2xl border'
				style={{
					backgroundColor: COLORS.surface[themeColorKey],
					borderColor: COLORS.border[themeColorKey]
				}}
			>
				<Text
					size='base'
					weight='medium'
				>
					{selectedOption?.label}
				</Text>
				<ChevronDown
					size={DEFAULT_ICON_SIZE}
					color={COLORS.text.secondary[themeColorKey]}
				/>
			</Button>

			<Modal
				visible={isOpen}
				transparent
				animationType='fade'
				onRequestClose={handleClose}
			>
				<TouchableWithoutFeedback onPress={handleClose}>
					<View
						className='flex-1 justify-center items-center'
						style={{ backgroundColor: COLORS.overlay[themeColorKey] }}
					>
						<TouchableWithoutFeedback>
							<View
								className='w-[80%] rounded-2xl overflow-hidden'
								style={{
									backgroundColor: COLORS.surface[themeColorKey]
								}}
							>
								{renderedOptions}
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	)
}
