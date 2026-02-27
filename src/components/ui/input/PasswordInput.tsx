import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { Eye, EyeOff } from 'lucide-react-native'
import React, { useCallback, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import IconButton from '../buttons/icon/IconButton'
import Text from '../Text'

export interface IPasswordInputProps extends TextInputProps {
	label?: string
	error?: string
	containerClassName?: string
}

export default function PasswordInput({
	label,
	error,
	containerClassName,
	className,
	...props
}: IPasswordInputProps) {
	const { themeColorKey } = useThemeMode()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible(prev => !prev)
	}, [])

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

			<View
				className='flex-row items-center px-4 rounded-2xl border'
				style={{
					backgroundColor: COLORS.surface[themeColorKey],
					borderColor: error
						? COLORS.error[themeColorKey]
						: COLORS.border[themeColorKey]
				}}
			>
				<TextInput
					className={cn('flex-1 py-3 text-base', className)}
					style={{
						color: error
							? COLORS.error[themeColorKey]
							: COLORS.text.primary[themeColorKey]
					}}
					placeholderTextColor={COLORS.text.disabled[themeColorKey]}
					selectionColor={COLORS.primary[themeColorKey]}
					secureTextEntry={!isPasswordVisible}
					autoCapitalize='none'
					autoCorrect={false}
					{...props}
				/>

				<IconButton
					icon={isPasswordVisible ? EyeOff : Eye}
					size={20}
					onPress={togglePasswordVisibility}
					className='ml-2 p-1'
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					iconColor={
						error
							? COLORS.error[themeColorKey]
							: COLORS.text.secondary[themeColorKey]
					}
				/>
			</View>

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
