import Layout from '@/components/layout/Layout'
import { Button, PrimaryButton, Text, Title } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import NetInfo from '@react-native-community/netinfo'
import { WifiOff } from 'lucide-react-native'
import {
	memo,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState
} from 'react'
import { Linking, Platform, View } from 'react-native'

function NetworkProviderComponent({ children }: PropsWithChildren) {
	const { themeColorKey } = useThemeMode()
	const [isConnected, setIsConnected] = useState(true)

	const checkConnection = useCallback(async () => {
		const state = await NetInfo.fetch()
		setIsConnected(state.isConnected ?? false)
	}, [])

	useEffect(() => {
		checkConnection()

		const unsubscribe = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected ?? false)
		})

		return () => unsubscribe()
	}, [checkConnection])

	const openNetworkSettings = useCallback(() => {
		if (Platform.OS === 'ios') {
			Linking.openURL('App-Prefs:root=General')
		} else {
			Linking.sendIntent('android.settings.WIRELESS_SETTINGS')
		}
	}, [])

	if (!isConnected) {
		return (
			<Layout className='justify-center items-center'>
				<View className='flex-col gap-4 items-center text-center justify-center'>
					<WifiOff
						size={64}
						color={COLORS.text.primary[themeColorKey]}
					/>

					<Title
						align='center'
						title='Нет подключения к интернету'
					/>

					<Text align='center'>
						Для продолжения работы проверьте настройки подключения к интернету
					</Text>

					<PrimaryButton
						className='mb-2'
						onPress={openNetworkSettings}
					>
						Включить интернет
					</PrimaryButton>

					<Button onPress={checkConnection}>
						<Text style={{ color: COLORS.primary[themeColorKey] }}>
							Проверить подключение
						</Text>
					</Button>
				</View>
			</Layout>
		)
	}

	return <>{children}</>
}

export const NetworkProvider = memo(NetworkProviderComponent)
