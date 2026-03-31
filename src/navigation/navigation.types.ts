import { CartStackParamList } from './stack/cart/CartStack'
import { FavoriteStackParamList } from './stack/favorite/FavoriteStack'
import { HomeStackParamList } from './stack/home/HomeStack'
import { ProfileStackParamList } from './stack/profile/ProfileStack'
import { SearchStackParamList } from './stack/search/SearchStack'

export type TypeTabParamList = {
	HomeStack: undefined
	SearchStack: undefined
	FavoriteStack: undefined
	CartStack: undefined
	ProfileStack: undefined
}

export type TypeRootStackParamList = CartStackParamList &
	FavoriteStackParamList &
	HomeStackParamList &
	ProfileStackParamList &
	SearchStackParamList & {
		MainTabs: undefined
		ProductInfo: { productId: string }
		Auth: undefined
	}
