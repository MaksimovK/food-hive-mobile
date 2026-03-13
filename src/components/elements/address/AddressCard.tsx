import { Button, IconButton, Text } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { IAddress } from '@/types'
import { formatAddress } from '@/utils'
import { CheckCircle2, MapPin, Trash2 } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'

export interface IAddressCardProps {
	address: IAddress
	onEdit?: (address: IAddress) => void
	onDelete?: (id: string) => void
	onSetDefault?: (id: string) => void
}

export default function AddressCard({
	address,
	onEdit,
	onDelete,
	onSetDefault
}: IAddressCardProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<Button
			className='rounded-2xl border-2 p-4 gap-3'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: address.isDefault
					? COLORS.primary[themeColorKey]
					: COLORS.border[themeColorKey]
			}}
			onPress={() => {
				onEdit?.(address)
			}}
		>
			<View className='flex-row items-start justify-between'>
				<View className='flex-row items-center gap-2 flex-1'>
					<View
						className='p-2 rounded-xl'
						style={{
							backgroundColor: address.isDefault
								? COLORS.primary[themeColorKey] + '20'
								: COLORS.surfaceElevated[themeColorKey]
						}}
					>
						<MapPin
							size={DEFAULT_ICON_SIZE}
							color={
								address.isDefault
									? COLORS.primary[themeColorKey]
									: COLORS.text.secondary[themeColorKey]
							}
						/>
					</View>

					<View className='flex-1'>
						{address.label && (
							<Text
								size='sm'
								weight='medium'
								style={{ color: COLORS.text.secondary[themeColorKey] }}
							>
								{address.label}
							</Text>
						)}
						<Text
							size='base'
							weight='semibold'
							numberOfLines={2}
						>
							{formatAddress(address)}
						</Text>
					</View>
				</View>

				<View className='flex-row items-center gap-2'>
					{address.isDefault && (
						<View className='flex-row items-center gap-1'>
							<CheckCircle2
								size={14}
								color={COLORS.success[themeColorKey]}
							/>
							<Text
								size='xs'
								weight='medium'
								style={{ color: COLORS.success[themeColorKey] }}
							>
								Основной
							</Text>
						</View>
					)}

					{onDelete && (
						<IconButton
							icon={Trash2}
							size={20}
							iconColor={COLORS.error[themeColorKey]}
							onPress={e => {
								e.stopPropagation()
								onDelete(address.id)
							}}
						/>
					)}
				</View>
			</View>

			{address.comment && (
				<View
					className='px-3 py-2 rounded-xl'
					style={{ backgroundColor: COLORS.surfaceElevated[themeColorKey] }}
				>
					<Text
						size='sm'
						style={{ color: COLORS.text.secondary[themeColorKey] }}
						numberOfLines={2}
					>
						{address.comment}
					</Text>
				</View>
			)}

			{!address.isDefault && onSetDefault && (
				<Button
					className='px-3 py-2 rounded-xl'
					style={{ backgroundColor: COLORS.primary[themeColorKey] }}
					onPress={e => {
						e.stopPropagation()
						onSetDefault(address.id)
					}}
				>
					<Text
						size='sm'
						weight='medium'
						style={{ color: COLORS.text.onPrimary[themeColorKey] }}
					>
						Сделать основным
					</Text>
				</Button>
			)}
		</Button>
	)
}
