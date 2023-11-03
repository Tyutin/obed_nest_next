import CartItemProduct from '@shopComponents/CartItem/CartItemProduct';
import { ProductEntityInCart } from '@store/product/types';
import './CartProductsList.scss';

export default function CartProductsList(props: {
  items: ProductEntityInCart[];
}) {
  const { items } = props;
  return (
    <ul className="cart-product-list">
      {items.map((item) => {
        return (
          <li className="cart-page__product-item" key={item.id}>
            <CartItemProduct item={item} />
          </li>
        );
      })}
    </ul>
  );
}
