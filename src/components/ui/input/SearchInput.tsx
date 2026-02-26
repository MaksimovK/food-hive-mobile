import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { X } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import IconButton from '../buttons/icon/IconButton'

export interface ISearchInputProps extends TextInputProps {
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
}

export default function SearchInput({
	value,
	onChangeText,
	placeholder = 'Поиск продуктов...',
	className,
	...props
}: ISearchInputProps) {
	const { themeColorKey } = useThemeMode()

	const handleClear = useCallback(() => {
		onChangeText('')
	}, [onChangeText])

	return (
		<View
			className={cn(`flex-row items-center px-2 py-1 rounded-2xl`, className)}
			style={{
				backgroundColor: COLORS.search.background[themeColorKey],
				borderColor: COLORS.border[themeColorKey],
				borderWidth: 1
			}}
		>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={COLORS.search.icon[themeColorKey]}
				selectionColor={COLORS.primary[themeColorKey]}
				className='flex-1 text-base'
				style={{
					color: COLORS.text.primary[themeColorKey]
				}}
				keyboardType='web-search'
				autoCapitalize='none'
				autoCorrect={false}
				{...props}
			/>

			{value.length > 0 && (
				<IconButton
					onPress={handleClear}
					className='ml-2 p-1'
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					icon={X}
					iconColor={COLORS.search.icon[themeColorKey]}
				/>
			)}
		</View>
	)
}
