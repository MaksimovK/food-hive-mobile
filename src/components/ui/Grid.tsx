import cn from 'clsx'
import React, { forwardRef } from 'react'
import { FlatList, FlatListProps, View } from 'react-native'

interface IGridProps<T> extends FlatListProps<T> {
	container?: React.ComponentProps<typeof View>
}

const Grid = forwardRef<FlatList, IGridProps<any>>(
	(
		{
			container = {
				className: ''
			},
			scrollEnabled = false,
			showsVerticalScrollIndicator = false,
			showsHorizontalScrollIndicator = false,
			className,
			renderItem,
			...props
		},
		ref
	) => {
		if (!renderItem) return null

		const { className: classNameContainer, ...propsContainer } = container

		return (
			<FlatList
				{...props}
				ref={ref}
				className={className}
				showsVerticalScrollIndicator={showsVerticalScrollIndicator}
				showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
				renderItem={item => {
					const Component = renderItem(item)
					return (
						<View
							{...propsContainer}
							className={cn(`flex-1`, classNameContainer)}
							style={[propsContainer.style]}
						>
							{Component}
						</View>
					)
				}}
				scrollEnabled={scrollEnabled}
			/>
		)
	}
)

Grid.displayName = 'Grid'
export default Grid
