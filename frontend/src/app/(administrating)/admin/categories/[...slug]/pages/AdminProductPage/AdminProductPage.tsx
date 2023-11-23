import { CategoryEntityInterface } from '../../../../../../../../../shared/types/Category/front/CategoryEntity.interface';
import { ProductEntityInterface } from '../../../../../../../../../shared/types/Product/front/ProductEntity.interface';
import './AdminProductPage.scss';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminProductPage(props: {
  category: CategoryEntityInterface;
  product: ProductEntityInterface;
}) {
  const { category, product } = props;
  return (
    <div className="product-page">
      <div className="product-page__title">{product.title}</div>
    </div>
  );
}
