import React from 'react'
import { Pressable } from 'react-native'
import Loader from '../Loader'
import { IButtonProps } from './button.interface'

export default function Button({
	isLoading,
	children,
	disabled,
	className,
	...props
}: IButtonProps) {
	return (
		<Pressable
			{...props}
			className={className}
			disabled={isLoading || disabled}
		>
			{isLoading ? <Loader isLoaderButton /> : children}
		</Pressable>
	)
}
