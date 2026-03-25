import { useDebounce, useFetchAddressSuggestions } from '@/hooks'
import { useCallback, useEffect, useState } from 'react'

export interface IAddressSuggestionValue {
	street: string
	house: string
	flat?: string
}

export function useAddressSuggestions() {
	const [query, setQuery] = useState('')
	const [showSuggestions, setShowSuggestions] = useState(false)
	const debouncedQuery = useDebounce(query, 500)

	const {
		mutate: fetchSuggestions,
		data: suggestionsData,
		isPending
	} = useFetchAddressSuggestions()

	useEffect(() => {
		if (debouncedQuery.length > 0) {
			fetchSuggestions({ query: debouncedQuery, count: 5 })
			setShowSuggestions(true)
		} else {
			setShowSuggestions(false)
		}
	}, [debouncedQuery, fetchSuggestions])

	const handleQueryChange = useCallback((value: string) => {
		setQuery(value)
	}, [])

	const handleSelectSuggestion = useCallback(
		(suggestion: {
			value: string
			data: {
				street_with_type: string | null
				house: string | null
				flat: string | null
			}
		}) => {
			const result: IAddressSuggestionValue = {
				street: suggestion.data.street_with_type || '',
				house: suggestion.data.house || '',
				flat: suggestion.data.flat || ''
			}

			setShowSuggestions(false)
			return result
		},
		[]
	)

	const handleCloseSuggestions = useCallback(() => {
		setShowSuggestions(false)
	}, [])

	const handleFocus = useCallback(() => {
		if (query.length > 0) {
			setShowSuggestions(true)
		}
	}, [query])

	const handleBlur = useCallback(() => {
		setTimeout(() => {
			setShowSuggestions(false)
		}, 1000)
	}, [])

	const suggestions = suggestionsData?.suggestions || []

	return {
		query,
		showSuggestions,
		suggestions,
		isPending,
		handleQueryChange,
		handleSelectSuggestion,
		handleCloseSuggestions,
		handleFocus,
		handleBlur
	}
}
