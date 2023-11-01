import ShopItem from '@shopComponents/ShopItem/ShopItem';
import ShopShareButton from '@shopComponents/ShopShareButton/ShopShareButton';
import { CategoryEntityInterface } from '../../../../../../shared/types/Category/front/CategoryEntity.interface';
import { ProductEntityInterface } from '../../../../../../shared/types/Product/front/ProductEntity.interface';
import './ShopProductPage.scss';
import Link from 'next/link';
import Image from 'next/image';
import ProductCartControls from '@shopComponents/ProductCartControls/ProductCartControls';

export function BreadcrumbSeparator() {
  const svgStyle = {
    margin: '0 4px',
  };
  const pathStyle = {
    margin: '4px',
  };
  return (
    <svg
      width="10"
      height="10"
      fill="currentColor"
      viewBox="0 0 16 16"
      style={svgStyle}
    >
      <path
        style={pathStyle}
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      ></path>
    </svg>
  );
}

export default async function ShopProductPage(props: {
  category: CategoryEntityInterface;
  product: ProductEntityInterface;
}) {
  const { category, product } = props;
  return (
    <div className="product-page">
      <div className="product-page__controlls">
        <span className="product-page__breadcrumbs">
          <Link href={'/'}>Главная</Link>
          <BreadcrumbSeparator />
          <Link href={`/${category.slugRu}`}>{category.title}</Link>
          <BreadcrumbSeparator />
          {product.title}
        </span>
        <ShopShareButton />
      </div>
      <div className="product-page__title product-page_visible_tablet">
        {product.title}
      </div>
      <div className="product-page__product">
        <div className="product-page__image-wrapper">
          <Image
            quality={100}
            src={product.image || '/images/items/item.png'}
            alt={product.title}
            className="product-page__image"
            fill={true}
          />
        </div>
        <div className="product-page__info">
          <div className="product-page__title product-page_visible_desktop">
            {product.title}
          </div>
          <div className="product-page__info-block">
            <span className="product-page__info-name">Описание</span>
            {product.description}
          </div>
          <div className="product-page__info-block">
            <span className="product-page__info-name">Вес/Объем</span>
            {product.weight}
          </div>
          <div className="product-page__info-block">
            <span className="product-page__info-name">Цена</span>
            {product.price}₽
          </div>
          <div className="product-page__cart-block">
            <ProductCartControls product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
