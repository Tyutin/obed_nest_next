import { getCity } from '@fetch/getData';

import './ShopCategoryPage.scss';
import ShopItem from '@shopComponents/ShopItem/ShopItem';
import ShopShareButton from '@shopComponents/ShopShareButton/ShopShareButton';

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const cityResponse = await getCity();
  const category = cityResponse.city.categories.find(
    (cat) => cat.slugEn === decodedSlug || cat.slugRu === decodedSlug
  );
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
