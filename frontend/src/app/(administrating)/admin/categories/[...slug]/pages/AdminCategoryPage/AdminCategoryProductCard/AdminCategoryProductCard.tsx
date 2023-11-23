import Image from 'next/image';
import { ProductEntityInterface } from '../../../../../../../../../../shared/types/Product/front/ProductEntity.interface';
import './AdminCategoryProductCard.scss';
import Link from 'next/link';
import classNames from 'classnames';

interface AdminCategoryProductCardProps {
  product: ProductEntityInterface;
  categorySlug: string;
}
export default function AdminCategoryProductCard(
  props: AdminCategoryProductCardProps
) {
  const { product, categorySlug } = props;
  return (
    <Link
      href={`/admin/categories/${categorySlug}/${product.slugEn}`}
      className={classNames('cat-product-card', {
        'cat-product-card_unpublished': !product.published,
      })}
    >
      <div className="cat-product-card__image-wrapper">
        <Image
          quality={100}
          src={product.image || '/images/items/item.png'}
          alt={product.title}
          className="cat-product-card__image"
          fill={true}
        />
      </div>
      <span className="cat-product-card__title">{product.title}</span>
      <span className="cat-product-card__price">{product.price}₽</span>
      <span className="cat-product-card__published">
        {product.published ? 'Опубликован' : 'Не опубликован'}
      </span>
    </Link>
  );
}
