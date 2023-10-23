'use client';
import ShopProductSwiper from './ShopProductSwiper/ShopProductSwiper';
import { CategoryEntityInterface } from '../../../../../shared/types/Category/front/CategoryEntity.interface';

import './ShopCategory.scss';

export default function ShopCategory(props: {
  category: CategoryEntityInterface;
}) {
  const { category } = props;
  return (
    <div className="shop-category" id={category.slugRu}>
      <h2 className="shop-category__title">{category.title}</h2>
      <div className="shop-category__list-wrapper">
        <ShopProductSwiper products={category.products} />
      </div>
    </div>
  );
}
