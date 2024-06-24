import React, { memo, Suspense } from 'react'
import { Loading } from '../shared'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { CommonState } from '../../store/base/commonSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Layout: React.FC = () => {
	
	const { path_from_root }: CommonState = useSelector((state: RootState) => state.base.common)

	return (
		<Suspense fallback={<Loading loading={true} />}>
		<div className='flex flex-col h-100'>
			<Header />
			<main className='flex-auto w-100 bg-gray'>
				<p className='path-item-root'>{
					path_from_root.map((segment, index, array) => {
						if (index === array.length - 1) {
							return <strong>{segment}</strong>;
						} else {
							return `${segment} > `;
						}
					})
				}</p>
				<div className='contain bg-white'>
					<Outlet />
				</div>
			</main>
		</div>
		</Suspense>
	)
}

export default memo(Layout)