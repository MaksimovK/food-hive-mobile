import { COLORS } from '@/constants/colors.constant'
import { useTheme } from '@/store/theme.store'
import { Text as RNText, type TextProps as RNTextProps } from 'react-native'

export interface TextProps extends RNTextProps {
	variant?: 'primary' | 'secondary' | 'disabled'
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
	weight?: 'normal' | 'medium' | 'semibold' | 'bold'
	align?: 'auto' | 'left' | 'center' | 'right' | 'justify'
}

export function Text({
	children,
	variant = 'primary',
	size = 'base',
	weight = 'normal',
	align = 'auto',
	style,
	...props
}: TextProps) {
	const theme = useTheme()

	const variantColors = {
		primary: COLORS.text.primary[theme],
		secondary: COLORS.text.secondary[theme],
		disabled: COLORS.text.disabled[theme]
	}

	const fontSizes = {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		'2xl': 24
	}

	const fontWeights = {
		normal: '400' as const,
		medium: '500' as const,
		semibold: '600' as const,
		bold: '700' as const
	}

	return (
		<RNText
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
