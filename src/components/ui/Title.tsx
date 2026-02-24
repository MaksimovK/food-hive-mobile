import Text from '@/components/ui/Text'
import React from 'react'

export interface TitleProps {
	title: string
	className?: string
}

export default function Title({ title, className }: TitleProps) {
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
