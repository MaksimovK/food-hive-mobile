import { IconButton } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode, useTypedNavigation } from '@/hooks'
import cn from 'clsx'
import { ArrowLeft } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IBackButtonProps extends Omit<IIconButtonProps, 'icon'> {
	backgroundColor?: string
}

export default function BackButton({
	backgroundColor,
	onPress,
	className,
	...props
}: IBackButtonProps) {
	const navigation = useTypedNavigation()
	const { themeColorKey } = useThemeMode()
	const handleGoBack = useCallback(() => navigation.goBack(), [navigation])

	return (
		<IconButton
			{...props}
			className={cn(`w-[36px] h-[36px]`, className)}
			style={{
				backgroundColor:
					backgroundColor || COLORS.surfaceElevated[themeColorKey],
				...props.style
			}}
			icon={ArrowLeft}
			iconColor={COLORS.text.primary[themeColorKey]}
			onPress={onPress || handleGoBack}
		/>
	)
}
