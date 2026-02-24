import React from 'react'
import Text from './Text'

export interface ITitleProps {
	title: string
	className?: string
}

export default function Title({ title, className }: ITitleProps) {
	return (
		<Text
			size='2xl'
			weight='bold'
			align='left'
			className={className}
		>
			{title}
		</Text>
	)
}
