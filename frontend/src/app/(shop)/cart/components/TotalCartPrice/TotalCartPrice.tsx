import './TotalCartPrice.scss';

export default function TotalCartPrice(props: { totalCartPrice: number }) {
  const { totalCartPrice } = props;
  return (
    <span className="total-cart-price">
      Сумма заказа:
      <span className="total-cart-price__price"> {totalCartPrice}₽</span>
    </span>
  );
}
