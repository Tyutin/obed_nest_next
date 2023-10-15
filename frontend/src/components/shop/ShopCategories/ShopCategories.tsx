import { getCity } from '@fetch/getData';
import './ShopCategories.scss';
import ShopItem from '@shopComponents/ShopItem/ShopItem';

export default async function ShopCategories() {
  const categories = (await getCity()).city.categories;

  return (
    <ul className="shop-categories">
      {categories
        .filter((cat) => cat.published && cat.products.length > 0)
        .map((category) => {
          return (
            <li className="shop-categories__item" key={category.id}>
              <h2 className="shop-categories__item-title">{category.title}</h2>
              <ul className="shop-categories__list">
                {category.products.map((product) => {
                  return (
                    <li className="shop-categories__list-item" key={product.id}>
                      <ShopItem
                        title={product.title}
                        price={product.price}
                        image={product.image}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
    </ul>
  );
}
