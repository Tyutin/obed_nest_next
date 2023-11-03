import './CartPage.scss';
import CartProducts from './components/CartProducts/CartProducts';

export default function CartPage() {
  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Корзина</h1>
      <CartProducts />
    </div>
  );
}
