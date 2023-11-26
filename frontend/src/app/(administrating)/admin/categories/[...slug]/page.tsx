'use client';

import { redirect } from 'next/navigation';

import AdminCategoryPage from '@adminComponents/pages/AdminCategoryPage/AdminCategoryPage';
import AdminProductPage from '@adminComponents/pages/AdminProductPage/AdminProductPage';

export default function CategoryPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  if (slug.length > 2) {
    redirect('/admin');
  }
  if (slug.length === 1) {
    return <AdminCategoryPage slug={slug[0]} />;
  } else {
    return <AdminProductPage slugs={slug} />;
  }
}
