import reducer from './store'
import { injectReducer, RootState } from '../../../store/index'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from './components/Product'
import { Product as ProductType } from '../../../interfaces/product.interface'
import { useEffect } from 'react'
import { getProducts } from './store/dataSlice'
import { setPath } from '../../../store/base/commonSlice'

injectReducer('productList', reducer)

const ProductList = () => {

	const dispatch = useDispatch();

	const { products } = useSelector((state: RootState) => state.productList.data)

	const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';

	useEffect(() => {
		dispatch(setPath(['Inicio']))
		dispatch(getProducts({ q: searchParam }))
		return () => {
			dispatch(setPath(['']))
		}
	}, [searchParam])
	

	return (
			<section className="flex flex-col items-center justify-between mb-4 divide-x">
				{ products?.map((product: ProductType) => <Product product={product} />) }
			</section>
	)
}

export default ProductList