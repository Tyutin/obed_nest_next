'use client';
import { useState } from 'react';
import ProductsToggleButton from '../ProductsToggleButton/ProductsToggleButton';
import TotalCartPrice from '../TotalCartPrice/TotalCartPrice';
import { useCartStore } from '@store/cart/useCartStore';
import { useProductStore } from '@store/product/useProductStore';
import { ProductEntityInCart } from '@store/product/types';
import CartProductsList from '../CartProductsList/CartProductsList';

import './CartProducts.scss';

export default function CartProducts() {
  const items = useCartStore((state) => state.items);
  const cityProducts = useProductStore((state) => state.products);

  const itemsToShow = items.map((item) => {
    const cityProduct = cityProducts.find((product) => product.id === item.id);
    return { ...cityProduct, count: item.count } as ProductEntityInCart;
  });
  const totalCartPrice = itemsToShow.reduce((acc, curr) => {
    return acc + curr.count * curr.price;
  }, 0);
  const totalItemsCount = itemsToShow.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
  const [isProductsVisible, setIsProductsVisible] = useState(true);

  if (!itemsToShow || itemsToShow.length <= 0) {
    return (
      <div className="cart-products-empty">
        <span className="cart-products-empty__message">
          В вашей корзине ничего нет
        </span>
      </div>
    );
  }

  return (
    <div className="cart-products">
      <div className="cart-products__heading">
        <ProductsToggleButton
          totalItemsCount={totalItemsCount}
          isProductsVisible={isProductsVisible}
          setIsProductsVisible={setIsProductsVisible}
        />
        {!isProductsVisible && (
          <TotalCartPrice totalCartPrice={totalCartPrice} />
        )}
      </div>
      {isProductsVisible && <CartProductsList items={itemsToShow} />}
      {isProductsVisible && <TotalCartPrice totalCartPrice={totalCartPrice} />}
    </div>
  );
}
