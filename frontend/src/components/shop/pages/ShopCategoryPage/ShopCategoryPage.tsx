import ShopItem from '@shopComponents/ShopItem/ShopItem';
import ShopShareButton from '@shopComponents/ShopShareButton/ShopShareButton';
import { CategoryEntityInterface } from '../../../../../../shared/types/Category/front/CategoryEntity.interface';
import './ShopCategoryPage.scss';

export default async function ShopCategoryPage(props: {
  category: CategoryEntityInterface;
}) {
  const { category } = props;
  return (
    <div className="category-page">
      <div className="category-page__heading">
        <h1 className="category-page__title">{category?.title}</h1>
        <ShopShareButton />
      </div>
      <ul className="category-page__product-list">
        {category?.products.map((product) => {
          return (
            <li className="category-page__product-item" key={product.id}>
              <ShopItem product={product} category={category} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
