import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { PropsWithChildren } from 'react'
import { Text as RNText, type TextProps as RNTextProps } from 'react-native'

export interface ITextProps extends RNTextProps {
	variant?: 'primary' | 'secondary' | 'disabled'
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
	weight?: 'normal' | 'medium' | 'semibold' | 'bold'
	align?: 'auto' | 'left' | 'center' | 'right' | 'justify'
	className?: string
}

export default function Text({
	children,
	variant = 'primary',
	size = 'base',
	weight = 'normal',
	align = 'auto',
	className,
	style,
	...props
}: PropsWithChildren<ITextProps>) {
	const { themeColorKey } = useThemeMode()

	const variantColors = {
		primary: COLORS.text.primary[themeColorKey],
		secondary: COLORS.text.secondary[themeColorKey],
		disabled: COLORS.text.disabled[themeColorKey]
	} as const

	const fontSizes = {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		'2xl': 24
	} as const

	const fontWeights = {
		normal: '400',
		medium: '500',
		semibold: '600',
		bold: '700'
	} as const

	return (
		<RNText
			className={className}
			style={[
				{
					color: variantColors[variant],
					fontSize: fontSizes[size],
					fontWeight: fontWeights[weight],
					textAlign: align
				},
				style
			]}
			{...props}
		>
			{children}
		</RNText>
	)
}
