import React, { PropsWithChildren } from 'react'
import { Pressable } from 'react-native'
import Loader from '../Loader'
import { IButtonProps } from './button.interface'

export default function Button({
	isLoading,
	children,
	disabled,
	className,
	...props
}: PropsWithChildren<IButtonProps>) {
	return (
		<Pressable
			{...props}
			className={className}
			disabled={isLoading || disabled}
		>
			{isLoading ? <Loader /> : children}
		</Pressable>
	)
}
