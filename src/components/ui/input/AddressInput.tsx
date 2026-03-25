import { AddressSuggestions } from '@/components/elements'
import { Input } from '@/components/ui'
import { COLORS } from '@/constants'
import {
	IAddressSuggestionValue,
	useAddressSuggestions,
	useThemeMode
} from '@/hooks'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import { AddressFormData } from '../forms/address/AddAddressForm'

export interface IAddressInputProps {
	control: UseFormReturn<AddressFormData>['control']
	onAddressSelect: (address: IAddressSuggestionValue) => void
}

export default function AddressInput({
	control,
	onAddressSelect
}: IAddressInputProps) {
	const { themeColorKey } = useThemeMode()
	const {
		query,
		showSuggestions,
		suggestions,
		handleQueryChange,
		handleSelectSuggestion,
		handleFocus,
		handleBlur
	} = useAddressSuggestions()

	return (
		<View className='flex-1 relative'>
			<Controller
				control={control}
				name='street'
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<>
						<Input
							label='Улица *'
							placeholder='Начните вводить адрес'
							value={value}
							onChangeText={text => {
								onChange(text)
								handleQueryChange(text)
							}}
							onFocus={handleFocus}
							onBlur={handleBlur}
							error={error?.message}
						/>

						{showSuggestions && query.length > 0 && suggestions.length > 0 && (
							<View
								className='absolute top-full left-0 right-0 mt-1 rounded-2xl border z-50'
								style={{
									backgroundColor: COLORS.surface[themeColorKey],
									borderColor: COLORS.border[themeColorKey]
								}}
							>
								<AddressSuggestions
									suggestions={suggestions}
									onSelect={suggestion => {
										const address = handleSelectSuggestion(suggestion)
										onChange(address.street)
										onAddressSelect(address)
									}}
									onClose={handleBlur}
								/>
							</View>
						)}
					</>
				)}
			/>
		</View>
	)
}
