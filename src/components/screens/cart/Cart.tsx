import { Empty, InfoFooter, ProductCard } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { IconButton, Scroll, Separator } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import { CartStackParamList } from '@/navigation/stack/cart/CartStack'
import {
	useCartItems,
	useCartTotalPrice,
	useCartTotalProducts,
	useClearCart
} from '@/store'
import { ShoppingCart, Trash2 } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { View } from 'react-native'

export default function CartScreen() {
	const navigation = useTypedNavigation<CartStackParamList>()
	const products = useCartItems()
	const totalProducts = useCartTotalProducts()
	const totalPrice = useCartTotalPrice()
	const clearCart = useClearCart()

	const handleGoToCheckout = useCallback(
		() => navigation.navigate('Order'),
		[navigation]
	)

	if (totalProducts === 0) {
		return (
			<Empty
				icon={ShoppingCart}
				title='Корзина пуста'
				description='Добавьте товары в корзину'
			/>
		)
	}

	return (
		<Layout>
			<Scroll>
				<View className='flex-row justify-end my-4'>
					<IconButton
						icon={Trash2}
						text='Очистить корзину'
						onPress={clearCart}
					/>
				</View>

				{products.map(product => (
					<View
						key={`product-cart-${product.id}`}
						className='pt-4'
					>
						<ProductCard
							variant='horizontal'
							showQuantityControl
							product={product}
						/>

						<Separator className='py-2' />
					</View>
				))}

				<View className='h-28' />
			</Scroll>

			<InfoFooter
				totalProducts={totalProducts}
				totalPrice={totalPrice}
				onPress={handleGoToCheckout}
			/>
		</Layout>
	)
}
