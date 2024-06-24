import reducer from './store'
import { injectReducer, RootState } from '../../../store/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { DataState, getProductById } from './store/dataSlice'
import { useParams } from 'react-router-dom'
import { formatMoney } from '../../../utils/money'
import { setPath } from '../../../store/base/commonSlice'

injectReducer('productDetail', reducer)

const ProductDetail = () => {

	const dispatch = useDispatch();

	const { product }: DataState = useSelector((state: RootState) => state.productDetail.data)

	let { id } = useParams();

	useEffect(() => {
		return () => {
			dispatch(setPath([]))
		}
	}, [])
	

	useEffect(() => {
		dispatch(getProductById(id))
	}, [id])

	return (
			<section className="flex mb-4 p-8">
				<div className='w-70'>
					<div className='w-100 flex flex-center'>
						<img className='size-image-detail m-auto' src={product.picture} alt={product.title} />
					</div>
					<h2 className='mb-4 mt-16'>Descripción del producto</h2>
					<p className='text-gray'>{ product.description }</p>
				</div>
				<div className='w-30'>
					<span className='mb-2'><span className='capitalize'>{ product.condition }</span> - { product.sold_quantity } vendidos</span>
					<h3 className='mb-4'>{ product.title }</h3>
					<h1 className='mb-4'>$ { formatMoney(product.price.amount, product.price.decimals) }</h1>
					<button type='button' className='w-100 p-3 mt-4 bg-secondary rounded text-white border-0 cursor-pointer'>Comprar</button>
				</div>
			</section>
	)
}

export default ProductDetail