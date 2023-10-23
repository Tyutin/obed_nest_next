import { getCity } from '@fetch/getData';
import './ShopCategories.scss';
import ShopCategory from '@shopComponents/ShopCategory/ShopCategory';

export default async function ShopCategories() {
  const categories = (await getCity()).city.categories;

  return (
    <ul className="shop-categories">
      {categories
        .filter((cat) => cat.products.length > 0)
        .map((category) => {
          return (
            <li className="shop-categories__item" key={category.id}>
              <ShopCategory category={category} />
            </li>
          );
        })}
    </ul>
  );
}
