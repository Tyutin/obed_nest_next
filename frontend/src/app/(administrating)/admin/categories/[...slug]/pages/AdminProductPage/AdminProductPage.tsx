'use client';
import { CategoryEntityInterface } from '../../../../../../../../../shared/types/Category/front/CategoryEntity.interface';
import { ProductEntityInterface } from '../../../../../../../../../shared/types/Product/front/ProductEntity.interface';
import ProductForm from '../../components/ProductForm/ProductForm';
import './AdminProductPage.scss';

export default function AdminProductPage(props: {
  category: CategoryEntityInterface;
  product: ProductEntityInterface;
}) {
  const { category, product } = props;

  return (
    <div className="product-page">
      <div className="product-page__heading">
        <div className="product-page__title">{product.title}</div>
      </div>
      <ProductForm
        category={category}
        product={product}
        formName="withProduct"
      />
    </div>
  );
}
