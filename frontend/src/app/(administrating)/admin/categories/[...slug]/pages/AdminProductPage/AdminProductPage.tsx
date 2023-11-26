import { Breadcrumb } from 'antd';
import { CategoryEntityInterface } from '../../../../../../../../../shared/types/Category/front/CategoryEntity.interface';
import { ProductEntityInterface } from '../../../../../../../../../shared/types/Product/front/ProductEntity.interface';
import ProductForm from '../../components/ProductForm/ProductForm';
import './AdminProductPage.scss';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';

export default function AdminProductPage(props: {
  category: CategoryEntityInterface;
  product?: ProductEntityInterface;
}) {
  const { category, product } = props;
  const breadCrumbItems: ItemType[] = [
    {
      title: <Link href="/admin">О компании</Link>,
    },
    {
      title: <Link href="/admin/categories">Категории</Link>,
    },
    {
      title: (
        <Link href={`/admin/categories/${category.slugEn}`}>
          {category.title}
        </Link>
      ),
    },
    {
      title: product
        ? `Редактирование товара "${product.title}"`
        : 'Создание нового товара',
    },
  ];

  return (
    <div className="product-page">
      <div className="product-page__heading">
        <Breadcrumb items={breadCrumbItems} />
        <div className="product-page__title">
          {product?.title ||
            `Создание нового товара (Категория "${category.title}")`}
        </div>
      </div>
      <ProductForm category={category} product={product} />
    </div>
  );
}
