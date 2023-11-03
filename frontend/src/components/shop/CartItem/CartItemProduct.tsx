'use client';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa6';
import { useCartStore } from '@store/cart/useCartStore';
import ProductCartControls from '@shopComponents/ProductCartControls/ProductCartControls';
import './CartItemProduct.scss';
import { ProductEntityInCart } from '@store/product/types';

export default function CartItemProduct(props: { item: ProductEntityInCart }) {
  const { item } = props;
  const removeItem = useCartStore((state) => state.removeItem);
  const totalItemPrice = item.count * item.price;
  return (
    <div className="cart-item-product">
      <div className="cart-item-product__info">
        <div className="cart-item-product__image-wrapper">
          <Image
            src={item.image || '/images/items/item.png'}
            alt={item.title}
            quality={100}
            fill={true}
          />
        </div>
        <div className="cart-item-product__info-text">
          <span className="cart-item-product__title">{item.title}</span>
          <span className="cart-item-product__weight">{item.weight}</span>
        </div>
      </div>
      <div className="cart-item-product__controls">
        <span className="cart-item-product__total-price">
          {totalItemPrice}₽
        </span>
        <div className="cart-item-product__buttons">
          <ProductCartControls product={item} />
          <button
            className="cart-item-product__remove-button"
            onClick={() => {
              removeItem(item.id);
            }}
          >
            <FaTrash size={'100%'} color={'#9ea2b7'} />
          </button>
        </div>
      </div>
    </div>
  );
}
