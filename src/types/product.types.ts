const EnumUnit = {
	G: 'г',
	ML: 'мл'
} as const

export type EnumUnit = (typeof EnumUnit)[keyof typeof EnumUnit]

export const EnumUnitLabels: Record<EnumUnit, string> = {
	[EnumUnit.G]: 'грамм',
	[EnumUnit.ML]: 'мл'
}

export interface IProduct {
	id: string
	name: string
	description: string | null
	image: string
	price: number
	unit: EnumUnit
	caloriesPer100g: number
	proteinPer100g: number
	fatPer100g: number
	carbsPer100g: number
	servingSize: number
	isActive: boolean
	categoryId: string
}

export interface ICategory {
	id: string
	name: string
	image: string | null
}

export interface IIngredient {
	id: string
	name: string
	containsGluten: boolean
	containsDairy: boolean
	containsNuts: boolean
	containsSoy: boolean
	containsEggs: boolean
}

export interface IProductIngredient {
	id: string
	amount: number
	unit: string
	ingredient: IIngredient
}

export interface IProductDetails extends IProduct {
	category: ICategory
	productIngredients: IProductIngredient[]
}
