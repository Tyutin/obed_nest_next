import ShopItem from '@shopComponents/ShopItem/ShopItem';
import { CategoryEntity } from '../../../../../backend/src/category/category.entity';

import './ShopCategory.scss';

export default function ShopCategory(props: { category: CategoryEntity }) {
  const { category } = props;
  return (
    <div className="shop-category" id={category.slugRu}>
      <h2 className="shop-category__title">{category.title}</h2>
      <ul className="shop-category__list">
        {category.products.map((product) => {
          return (
            <li className="shop-category__item" key={product.id}>
              <ShopItem product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
