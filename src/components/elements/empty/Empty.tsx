import Layout from '@/components/layout/Layout'
import { Title } from '@/components/ui'
import React from 'react'

export default function Empty({ title }: { title: string }) {
	return (
		<Layout className='items-center justify-center'>
			<Title title={title} />
		</Layout>
	)
}
