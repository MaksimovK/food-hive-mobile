import { IconButton, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { X } from 'lucide-react-native'
import React, { PropsWithChildren } from 'react'
import {
	ModalProps,
	Modal as ReactNativeModal,
	TouchableOpacity,
	View
} from 'react-native'

export interface IModalProps extends ModalProps {
	visible: boolean
	onClose: () => void
	title?: string
	className?: string
}

export default function Modal({
	visible,
	onClose,
	title,
	children,
	className,
	...props
}: PropsWithChildren<IModalProps>) {
	const { themeColorKey } = useThemeMode()

	return (
		<ReactNativeModal
			{...props}
			visible={visible}
			transparent
			animationType='fade'
			onRequestClose={onClose}
		>
			<TouchableOpacity
				className='flex-1 justify-center items-center'
				activeOpacity={1}
				onPress={onClose}
				style={{
					backgroundColor: COLORS.overlay[themeColorKey]
				}}
			>
				<TouchableOpacity
					className={cn('w-[85%] rounded-3xl overflow-hidden', className)}
					activeOpacity={1}
					onPress={e => e.stopPropagation()}
					style={{
						backgroundColor: COLORS.surfaceElevated[themeColorKey]
					}}
				>
					<View
						className='flex-row items-center justify-between px-6 py-4 border-b'
						style={{
							borderBottomColor: COLORS.border[themeColorKey]
						}}
					>
						<Text
							size='xl'
							weight='semibold'
						>
							{title}
						</Text>
						<IconButton
							icon={X}
							size={24}
							onPress={onClose}
						/>
					</View>

					{children}
				</TouchableOpacity>
			</TouchableOpacity>
		</ReactNativeModal>
	)
}
