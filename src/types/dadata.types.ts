interface IDaDataSuggestion<T> {
	value: string
	data: T
}

export interface IDaDataRequest {
	query: string
	count: number
}

export interface IAddressData {
	street_with_type: string | null
	house: string | null
	flat: string | null
}

interface IDaDataResponse<T> {
	suggestions: IDaDataSuggestion<T>[]
}

export type IAddressResponse = IDaDataResponse<IAddressData>
