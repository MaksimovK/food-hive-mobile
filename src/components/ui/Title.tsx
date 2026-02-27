import React from 'react'
import Text, { ITextProps } from './Text'

export interface ITitleProps extends ITextProps {
	title: string
	className?: string
}

export default function Title({ title, className, ...props }: ITitleProps) {
	return (
		<Text
			{...props}
			size='2xl'
			weight='bold'
			className={className}
		>
			{title}
		</Text>
	)
}
