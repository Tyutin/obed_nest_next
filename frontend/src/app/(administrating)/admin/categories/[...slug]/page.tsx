import AdminCategoryPage from './pages/AdminCategoryPage/AdminCategoryPage';
import AdminProductPage from './pages/AdminProductPage/AdminProductPage';
import { fetchData } from '@fetch/fetchData';
import { redirect } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;

  if (slug.length > 2) {
    redirect('/');
  }

  const categorySlug = decodeURIComponent(slug[0]);
  const cityResponse = await fetchData.city.getCurrent();
  if (!cityResponse) {
    redirect('http://demo.obedaet-test.ru');
  }

  const category = cityResponse.city.categories.find(
    (cat) => cat.slugEn === categorySlug || cat.slugRu === categorySlug
  );

  if (!category) {
    redirect('/');
  }
  if (slug[1]) {
    const productSlug = decodeURIComponent(slug[1]);
    const product = category.products.find(
      (prod) => prod.slugEn === productSlug || prod.slugRu === productSlug
    );
    if (!product) {
      redirect('/');
    }
    return <AdminProductPage category={category} product={product} />;
  } else {
    return <AdminCategoryPage category={category} />;
  }
}
