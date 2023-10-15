import Image from 'next/image';
import './ShopItem.scss';

type ShopItemProps = {
  title: string;
  price: number;
  image: string;
};

export default function ShopItem(props: ShopItemProps) {
  const { title, price, image } = props;
  return (
    <div className="shop-item">
      <Image
        src={image || '/images/items/item.png'}
        width={200}
        height={200}
        alt=""
        className="shop-item__image"
      />
      <span className="shop-item__title">{title}</span>
      <div className="shop-item__buttons">
        <button className="shop-item__details-button">Подробнее</button>
        <div className="shop-item__cart">
          <span className="shop-item__cart-price">{price} р.</span>
          <button className="shop-item__cart-button">В корзину</button>
        </div>
      </div>
    </div>
  );
}
