import React from 'react';
import { Product as ProductType } from '../../../../interfaces/product.interface';
import { shippingFreeIcon } from '../../../../assets/images';
import { formatMoney } from '../../../../utils/money';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Link className='flex h-40 p-4 link-reset' to={`/items/${product.id}`}>
      <img className='h-100' src={product.picture} alt={product.title} />
      <div className='w-60 p-2'>
        <div className='flex align-end mb-2'>
          <p className='text-xl mr-2'>$ { formatMoney(product.price.amount) }</p>
          {
            product.free_shipping && (
              <div className='w-4 h-4 mb-05 bg-green rounded-full flex flex-center'>
                <img className='size-image-list' src={shippingFreeIcon} alt='Envio gratis' />
              </div>
            )
          }
        </div>
        <p>{ product.title }</p>
      </div>
      <p className='text-gray text-xs w-20 text-end mt-4'>{ product.seller }</p>
    </Link>
  );
};
