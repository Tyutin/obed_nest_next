import Image from 'next/image';
import './ShopItem.scss';
import { ProductEntityInterface } from '../../../../../shared/types/Product/front/ProductEntity.interface';
import Link from 'next/link';
import { CategoryEntityInterface } from '../../../../../shared/types/Category/front/CategoryEntity.interface';

export default function ShopItem(props: {
  product: ProductEntityInterface;
  category: CategoryEntityInterface;
}) {
  const { product, category } = props;
  return (
    <div className="shop-item">
      <Link
        href={`/${category.slugRu}/${product.slugRu}`}
        className="shop-item__image-wrapper"
      >
        <Image
          quality={100}
          src={product.image || '/images/items/item.png'}
          alt={product.title}
          className="shop-item__image"
          fill={true}
        />
      </Link>
      <h2 className="shop-item__title">{product.title}</h2>
      <Link
        href={`/${category.slugRu}/${product.slugRu}`}
        className="shop-item__link"
      >
        Подробнее
      </Link>
      <div className="shop-item__cart-controls">
        <span className="shop-item__cart-price">{product.price} р.</span>
        <button className="shop-item__cart-add-button">В корзину</button>
      </div>
    </div>
  );
}
