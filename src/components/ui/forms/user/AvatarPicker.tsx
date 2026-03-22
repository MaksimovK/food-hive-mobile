import { errorCatch } from '@/api/error'
import { Button, IconButton } from '@/components/ui'
import { toastError } from '@/components/ui/toast/toast-show'
import { IMAGE_URL } from '@/config'
import { useRemoveAvatar, useUploadAvatar } from '@/hooks'
import { Camera, Trash2 } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Image, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'

interface IAvatarPickerProps {
	currentAvatar: string | null
}

export default function AvatarPicker({ currentAvatar }: IAvatarPickerProps) {
	const uploadMutation = useUploadAvatar()
	const removeMutation = useRemoveAvatar()

	const handlePickImage = useCallback(async () => {
		try {
			const result = await launchImageLibrary({
				mediaType: 'photo',
				includeBase64: false,
				selectionLimit: 1,
				quality: 0.8
			})

			if (result.didCancel || !result.assets || result.assets.length === 0) {
				return
			}

			const selectedFile = result.assets[0]

			if (!selectedFile.uri) {
				toastError('Не удалось получить файл')
				return
			}

			if (selectedFile.fileSize && selectedFile.fileSize > 5 * 1024 * 1024) {
				toastError('Размер файла не должен превышать 5MB')
				return
			}

			const formData = new FormData()
			formData.append('avatar', {
				uri: selectedFile.uri,
				name: selectedFile.fileName || `avatar_${Date.now()}.jpg`,
				type: selectedFile.type || 'image/jpeg'
			} as unknown as Blob)

			uploadMutation.mutate(formData, {
				onError: error => {
					toastError(errorCatch(error))
				}
			})
		} catch (error) {
			console.error('Ошибка при выборе файла:', error)
			toastError(errorCatch(error))
		}
	}, [uploadMutation])

	const handleRemoveAvatar = useCallback(() => {
		removeMutation.mutate()
	}, [removeMutation])

	const avatarUri = currentAvatar ? `${IMAGE_URL}${currentAvatar}` : null

	return (
		<View className='items-center'>
			<View className='relative'>
				{avatarUri ? (
					<Image
						source={{ uri: avatarUri }}
						className='h-32 w-32 rounded-full border-4 border-primary'
						resizeMode='cover'
					/>
				) : (
					<View className='h-32 w-32 rounded-full border-4 border-primary bg-surface items-center justify-center'>
						<Button
							onPress={handlePickImage}
							className='items-center justify-center'
						>
							<Camera
								size={48}
								color='#6B7280'
							/>
						</Button>
					</View>
				)}

				<View className='absolute bottom-0 right-0 flex-row gap-2'>
					<IconButton
						icon={Camera}
						size={28}
						onPress={handlePickImage}
						disabled={uploadMutation.isPending}
						className='bg-primary rounded-full'
					/>

					{currentAvatar && (
						<IconButton
							icon={Trash2}
							size={28}
							onPress={handleRemoveAvatar}
							disabled={removeMutation.isPending}
							className='bg-error rounded-full'
						/>
					)}
				</View>
			</View>

			{uploadMutation.isPending || removeMutation.isPending ? (
				<View className='mt-2'>
					<Button
						disabled
						className='items-center'
					>
						<View className='h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin' />
					</Button>
				</View>
			) : null}
		</View>
	)
}
