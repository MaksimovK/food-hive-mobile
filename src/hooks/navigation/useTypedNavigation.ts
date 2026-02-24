import { TypeTabStackParamList } from '@/navigation/navigation.types'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const useTypedNavigation = () => {
	return useNavigation<NativeStackNavigationProp<TypeTabStackParamList>>()
}
