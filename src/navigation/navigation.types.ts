export type TypeTabParamList = {
	HomeStack: undefined
	SearchStack: undefined
	FavoriteStack: undefined
	CartStack: undefined
	ProfileStack: undefined
}

export type TypeRootStackParamList = {
	MainTabs: TypeTabParamList
	ProductInfo: { productId: string }
}
