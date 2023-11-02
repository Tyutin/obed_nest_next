'use client';
import CartItemProduct from '@shopComponents/CartItem/CartItemProduct';
import { useCartStore } from '../../store/cart';
import useStore from '../../store/useStore';
import './CartPage.scss';

export default function CartPage() {
  const items = useStore(useCartStore, (state) => state.items);
  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Корзина</h1>
      {!!items && items?.length > 0 ? (
        <ul className="cart-page__product-list">
          {items.map((item) => {
            return (
              <li className="cart-page__product-item" key={item.id}>
                <CartItemProduct item={item} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="cart-page__empty-cart-block">
          <span className="cart-page__empty-cart-message">
            В вашей корзине ничего нет
          </span>
        </div>
      )}
    </div>
  );
}
