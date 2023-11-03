'use client';
import CartItemProduct from '@shopComponents/CartItem/CartItemProduct';
import { useCartStore } from '@store/cart/useCartStore';
import './CartPage.scss';
import { useProductStore } from '@store/product/useProductStore';
import { ProductEntityInCart } from '@store/product/types';
import Link from 'next/link';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const cityProducts = useProductStore((state) => state.products);

  const itemsToShow = items.map((item) => {
    const cityProduct = cityProducts.find((product) => product.id === item.id);
    return { ...cityProduct, count: item.count } as ProductEntityInCart;
  });
  const totalCartPrice = itemsToShow.reduce((acc, curr) => {
    return acc + curr.count * curr.price;
  }, 0);
  if (!itemsToShow || itemsToShow.length <= 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page__title">Корзина</h1>
        <div className="cart-page__empty-cart-block">
          <span className="cart-page__empty-cart-message">
            В вашей корзине ничего нет
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Корзина</h1>
      <ul className="cart-page__product-list">
        {itemsToShow.map((item) => {
          return (
            <li className="cart-page__product-item" key={item.id}>
              <CartItemProduct item={item} />
            </li>
          );
        })}
      </ul>
      <div className="cart-page__next-step-controls">
        <span className="cart-page__total-cart-price-block">
          Сумма заказа:{' '}
          <span className="cart-page__total-cart-price">{totalCartPrice}₽</span>
        </span>
        <Link
          className="cart-page__continue-button"
          href={'/оформление-заказа'}
        >
          Оформить
        </Link>
      </div>
    </div>
  );
}
