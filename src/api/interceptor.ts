import { API_URL } from '@/config/api.config'
import axios, { CreateAxiosDefaults } from 'axios'

export const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

export { axiosClassic }
