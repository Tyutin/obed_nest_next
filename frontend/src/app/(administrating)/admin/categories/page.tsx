'use client';

import { useCityStore } from '@store/city/useCityStore';
import './CategoriesPage.scss';
import AdminCategoryCard from '@adminComponents/AdminCategoryCard/AdminCategoryCard';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

export default function CategoriesPage() {
  const categories = [...useCityStore((state) => state.city.categories)].sort(
    (a, b) => {
      if (a.published === b.published) {
        return a.title > b.title ? 1 : -1;
      } else return a.published > b.published ? -1 : 1;
    }
  );
  const breadCrumbItems: ItemType[] = [
    {
      title: <Link href="/admin">О компании</Link>,
    },
    {
      title: 'Категории товаров',
    },
  ];
  return (
    <div className="categories-page">
      <div className="categories-page__heading">
        <Breadcrumb items={breadCrumbItems} />
        <h1 className="categories-page__title">Категории товаров</h1>
      </div>
      <ul className="categories-page__product-list">
        <li className="categories-page__product-item">
          <AdminCategoryCard />
        </li>
        {categories.map((category) => {
          return (
            <li key={category.id} className="categories-page__product-item">
              <AdminCategoryCard category={category} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
