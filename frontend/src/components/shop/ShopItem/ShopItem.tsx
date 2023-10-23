import Image from 'next/image';
import './ShopItem.scss';
import { ProductEntityInterface } from '../../../../../shared/types/Product/front/ProductEntity.interface';

export default function ShopItem(props: { product: ProductEntityInterface }) {
  const { product } = props;
  return (
    <div className="shop-item">
      <Image
        quality={100}
        src={product.image || '/images/items/item.png'}
        width={200}
        height={200}
        alt=""
        className="shop-item__image"
      />
      <span className="shop-item__title">{product.title}</span>
      <div className="shop-item__buttons">
        <button className="shop-item__details-button">Подробнее</button>
        <div className="shop-item__cart">
          <span className="shop-item__cart-price">{product.price} р.</span>
          <button className="shop-item__cart-button">В корзину</button>
        </div>
      </div>
    </div>
  );
}
