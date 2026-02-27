import { Button, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React, { ComponentType } from 'react'
import { ButtonStateType, IButtonProps } from '../button.interface'

function PrimaryButtonDefault({
	children,
	className,
	onPress,
	disabled,
	...props
}: IButtonProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<Button
			{...props}
			onPress={onPress}
			disabled={disabled}
			className={cn(
				'justify-center items-center rounded-2xl py-4 px-4 w-full',
				className
			)}
			style={{
				backgroundColor: COLORS.primary[themeColorKey]
			}}
		>
			<Text
				size='lg'
				weight='bold'
				style={{
					color: COLORS.text.onPrimary[themeColorKey]
				}}
			>
				{children}
			</Text>
		</Button>
	)
}

function PrimaryButtonDisable({ children, className, ...props }: IButtonProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<Button
			{...props}
			disabled
			className={cn(
				'justify-center items-center rounded-2xl py-4 px-4 w-full',
				className
			)}
			style={{
				backgroundColor: COLORS.disabled.background[themeColorKey]
			}}
		>
			<Text
				size='lg'
				weight='bold'
				style={{
					color: COLORS.text.disabled[themeColorKey]
				}}
			>
				{children}
			</Text>
		</Button>
	)
}

export default function PrimaryButton({
	state = 'default',
	...props
}: IButtonProps) {
	const type: Record<ButtonStateType, ComponentType<IButtonProps>> = {
		default: PrimaryButtonDefault,
		disable: PrimaryButtonDisable
	}

	const TypedPrimaryButton = type[state]
	return (
		<TypedPrimaryButton
			{...props}
			state={state}
		/>
	)
}
