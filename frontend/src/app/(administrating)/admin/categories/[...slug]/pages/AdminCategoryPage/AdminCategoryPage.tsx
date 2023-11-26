import { CityEntityInterface } from '@shared/types/City/front/CityEntity.interface';
import { CategoryEntityInterface } from '@shared/types/Category/front/CategoryEntity.interface';
import AdminCategoryProductCard from '../../components/AdminCategoryProductCard/AdminCategoryProductCard';
import './AdminCategoryPage.scss';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { Collapse } from 'antd';

export default async function AdminCategoryPage(props: {
  category?: CategoryEntityInterface;
  city: CityEntityInterface;
}) {
  const { category, city } = props;
  const sortedProducts = !category
    ? []
    : category?.products.sort((a, b) => {
        if (a.published === b.published) {
          return a.title > b.title ? 1 : -1;
        } else return a.published > b.published ? -1 : 1;
      });
  return (
    <div className="category-page">
      <div className="category-page__heading">
        <h1 className="category-page__title">
          {!!category
            ? `Категория "${category.title}"`
            : 'Создание новой категории'}
        </h1>
      </div>
      {!category && <CategoryForm {...props} />}

      {!!category && (
        <>
          <Collapse
            defaultActiveKey="edit-category"
            size="large"
            items={[
              {
                key: 'edit-category',
                label: 'Редактирование категории',
                children: <CategoryForm {...props} />,
              },
              {
                key: 'category-products',
                label: `Товары категории "${category.title}"`,
                children: (
                  <ul className="category-page__product-list">
                    <li className="category-page__product-item">
                      <AdminCategoryProductCard
                        categorySlug={category.slugEn}
                      />
                    </li>
                    {sortedProducts.map((product) => {
                      return (
                        <li
                          key={product.id}
                          className="category-page__product-item"
                        >
                          <AdminCategoryProductCard
                            product={product}
                            categorySlug={category.slugEn}
                          />
                        </li>
                      );
                    })}
                  </ul>
                ),
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
