import { IMAGE_URL } from '@/config/api.config'

export const getFullImageUrl = (url: string) => ({
	uri: IMAGE_URL + url
})
