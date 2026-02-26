import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const useTypedNavigation = <
	T extends ParamListBase = TypeRootStackParamList
>() => {
	return useNavigation<NativeStackNavigationProp<T>>()
}
