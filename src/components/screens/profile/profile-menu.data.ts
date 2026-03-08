import { ProfileStackParamList } from '@/navigation/stack/profile/ProfileStack'
import { Box, Info, LucideIcon, MapPinHouse } from 'lucide-react-native'

export interface IProfileMenuItem {
	icon: LucideIcon
	label: string
	page: keyof ProfileStackParamList
}

export const profileMenu: IProfileMenuItem[] = [
	{ icon: Box, label: 'Мои заказы', page: 'OrderHistory' },
	{ icon: MapPinHouse, label: 'Адреса доставки', page: 'Address' },
	{
		icon: Info,
		label: 'О нас',
		page: 'About'
	}
]
