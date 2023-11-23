import { CategoryEntityInterface } from '../../../../../../../../../shared/types/Category/front/CategoryEntity.interface';
import './AdminCategoryPage.scss';
import AdminCategoryProductCard from './AdminCategoryProductCard/AdminCategoryProductCard';

export default async function AdminCategoryPage(props: {
  category: CategoryEntityInterface;
}) {
  const { category } = props;
  const sortedProducts = category.products.sort((a, b) =>
    a.published > b.published ? -1 : 1
  );
  return (
    <div className="category-page">
      <div className="category-page__heading">
        <h1 className="category-page__title">{category?.title}</h1>
      </div>
      <ul className="category-page__product-list">
        {sortedProducts.map((product) => {
          return (
            <li key={product.id} className="category-page__product-item">
              <AdminCategoryProductCard
                product={product}
                categorySlug={category.slugEn}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
