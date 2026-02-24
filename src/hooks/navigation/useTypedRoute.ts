import { TypeTabStackParamList } from '@/navigation/navigation.types'
import { RouteProp, useRoute } from '@react-navigation/native'

export const useTypedRoute = <T extends keyof TypeTabStackParamList>() => {
	return useRoute<RouteProp<TypeTabStackParamList, T>>()
}
