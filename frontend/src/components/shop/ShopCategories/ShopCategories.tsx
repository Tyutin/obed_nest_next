import { fetchData } from '@fetch/fetchData';
import './ShopCategories.scss';
import ShopCategory from '@shopComponents/ShopCategory/ShopCategory';
import { redirect } from 'next/navigation';

export default async function ShopCategories() {
  const cityResponse = await fetchData.city.getCurrent();
  if (!cityResponse) {
    redirect('http://demo.obedaet-test.ru');
  }
  const categories = cityResponse.city.categories;

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
