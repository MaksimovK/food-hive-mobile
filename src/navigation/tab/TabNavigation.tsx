import { COLORS } from '@/constants/colors.constant'
import { DEFAULT_ICON_SIZE } from '@/constants/component.constant'
import { useThemeMode } from '@/hooks'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	Heart,
	Home,
	Search,
	ShoppingCart,
	User,
	type LucideIcon
} from 'lucide-react-native'
import { TypeTabParamList } from '../navigation.types'
import CartStack from '../stack/cart/CartStack'
import FavoriteStack from '../stack/favorite/FavoriteStack'
import HomeStack from '../stack/home/HomeStack'
import ProfileStack from '../stack/profile/ProfileStack'
import SearchStack from '../stack/search/SearchStack'

const Tab = createBottomTabNavigator<TypeTabParamList>()

export function TabNavigator() {
	const { themeColorKey } = useThemeMode()

	function renderIcon(Icon: LucideIcon, focused: boolean) {
		return (
			<Icon
				size={DEFAULT_ICON_SIZE}
				color={
					focused
						? COLORS.nav.active[themeColorKey]
						: COLORS.nav.inactive[themeColorKey]
				}
			/>
		)
	}

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
					paddingBottom: 12,
					backgroundColor: COLORS.nav.background[themeColorKey]
				},
				tabBarLabel: () => null
			}}
		>
			<Tab.Screen
				name='HomeStack'
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => renderIcon(Home, focused)
				}}
			/>
			<Tab.Screen
				name='SearchStack'
				component={SearchStack}
				options={{
					tabBarIcon: ({ focused }) => renderIcon(Search, focused)
				}}
			/>
			<Tab.Screen
				name='FavoriteStack'
				component={FavoriteStack}
				options={{
					tabBarIcon: ({ focused }) => renderIcon(Heart, focused)
				}}
			/>
			<Tab.Screen
				name='CartStack'
				component={CartStack}
				options={{
					tabBarIcon: ({ focused }) => renderIcon(ShoppingCart, focused)
				}}
			/>
			<Tab.Screen
				name='ProfileStack'
				component={ProfileStack}
				options={{
					tabBarIcon: ({ focused }) => renderIcon(User, focused)
				}}
			/>
		</Tab.Navigator>
	)
}
