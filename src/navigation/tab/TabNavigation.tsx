import { COLORS } from '@/constants/colors.constant'
import { DEFAULT_ICON_SIZE } from '@/constants/component.constant'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	Heart,
	Home,
	ShoppingCart,
	User,
	type LucideIcon
} from 'lucide-react-native'
import { TypeRootStackParamList } from '../navigation.types'
import CartStack from '../stack/cart/CartStack'
import FavoriteStack from '../stack/favorite/FavoriteStack'
import HomeStack from '../stack/home/HomeStack'
import ProfileStack from '../stack/profile/ProfileStack'

const Tab = createBottomTabNavigator<TypeRootStackParamList>()

function renderIcon(Icon: LucideIcon, focused: boolean) {
	return (
		<Icon
			size={DEFAULT_ICON_SIZE}
			color={focused ? COLORS.blue.normal : COLORS.gray.normal}
		/>
	)
}

export function TabNavigator() {
	return (
		<Tab.Navigator
			initialRouteName='HomeStack'
			screenOptions={{
				headerShown: false,
				tabBarPosition: 'bottom',
				tabBarStyle: {
					height: 60,
					paddingHorizontal: 12,
					paddingTop: 12,
					paddingBottom: 12
				},
				tabBarLabel: () => null
			}}
		>
			<Tab.Screen
				name='HomeStack'
				component={HomeStack}
				options={{
					title: 'Главная',
					tabBarIcon: ({ focused }) => renderIcon(Home, focused)
				}}
			/>
			<Tab.Screen
				name='FavoriteStack'
				component={FavoriteStack}
				options={{
					title: 'Избранное',
					tabBarIcon: ({ focused }) => renderIcon(Heart, focused)
				}}
			/>
			<Tab.Screen
				name='CartStack'
				component={CartStack}
				options={{
					title: 'Корзина',
					tabBarIcon: ({ focused }) => renderIcon(ShoppingCart, focused)
				}}
			/>
			<Tab.Screen
				name='ProfileStack'
				component={ProfileStack}
				options={{
					title: 'Профиль',
					tabBarIcon: ({ focused }) => renderIcon(User, focused)
				}}
			/>
		</Tab.Navigator>
	)
}
