import { LucideIcon } from 'lucide-react-native'
import { IButtonProps } from '../button.interface'

export interface IIconButtonProps extends IButtonProps {
	icon?: LucideIcon
	size?: number
	text?: string
	iconColor?: string
	iconFill?: string
	strokeWidth?: number
	className?: string
}
