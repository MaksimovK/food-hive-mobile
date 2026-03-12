import Layout from '@/components/layout/Layout'
import { BackButton, Scroll, Text, Title } from '@/components/ui'
import React from 'react'
import { View } from 'react-native'

export default function AboutScreen() {
	return (
		<Layout>
			<Scroll>
				<View className='items-center justify-center py-4 '>
					<BackButton
						size={30}
						className='absolute left-0 top-4'
					/>
					<Title title='О нас' />
					<View className='mt-4 gap-4'>
						<Text size='base'>
							FoodHive — ваш надежный партнер в мире доставки еды. Мы стремимся
							сделать заказ продуктов и готовых блюд максимально удобным и
							доступным для каждого клиента.
						</Text>

						<Text size='base'>
							Мы предлагаем широкий ассортимент продуктов и блюд от лучших
							ресторанов города. В нашем каталоге вы найдете свежие продукты,
							гастрономические деликатесы, готовые блюда от проверенных
							партнеров и многое другое.
						</Text>

						<Text
							size='base'
							weight='semibold'
						>
							Наши преимущества:
						</Text>

						<View className='gap-2 ml-2'>
							<Text size='base'>• Быстрая и бережная доставка</Text>
							<Text size='base'>• Только свежие и качественные продукты</Text>
							<Text size='base'>• Широкий ассортимент товаров и блюд</Text>
							<Text size='base'>• Удобное мобильное приложение</Text>
							<Text size='base'>• Выгодные цены и регулярные акции</Text>
							<Text size='base'>• Поддержка клиентов 24/7</Text>
						</View>

						<Text size='base'>
							Мы работаем напрямую с производителями и поставщиками, что
							позволяет нам контролировать качество продукции и поддерживать
							доступные цены. Каждая позиция в нашем каталоге проходит
							тщательную проверку перед добавлением на витрину.
						</Text>

						<Text size='base'>
							Наша миссия — экономить ваше время и дарить радость от покупки
							качественных продуктов и любимых блюд, не выходя из дома. Мы
							постоянно развиваемся, добавляем новых партнеров и улучшаем
							сервис, чтобы вы получали лучший опыт заказа с FoodHive.
						</Text>

						<Text size='base'>
							Спасибо, что выбираете FoodHive! Мы ценим ваше доверие и будем
							рады видеть вас в числе наших постоянных клиентов.
						</Text>
					</View>
				</View>
			</Scroll>
		</Layout>
	)
}
