'use client';
import { CategoryEntity } from '../../../../../backend/src/category/category.entity';
import ShopProductSwiper from './ShopProductSwiper/ShopProductSwiper';

import './ShopCategory.scss';

export default function ShopCategory(props: { category: CategoryEntity }) {
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
