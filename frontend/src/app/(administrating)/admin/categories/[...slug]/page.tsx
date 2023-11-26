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

  const cityResponse = await fetchData.city.getCurrent();
  if (!cityResponse) {
    redirect('http://demo.obedaet-test.ru');
  }

  const categorySlug = decodeURIComponent(slug[0]);
  if (categorySlug === 'new' || categorySlug === 'new-category') {
    return <AdminCategoryPage city={cityResponse.city} />;
  }
  const category = cityResponse.city.categories.find(
    (cat) => cat.slugEn === categorySlug || cat.slugRu === categorySlug
  );

  if (!category) {
    redirect('/');
  }
  if (slug[1]) {
    if (slug[1] === 'new' || slug[1] === 'new-product') {
      return <AdminProductPage category={category} />;
    }
    const productSlug = decodeURIComponent(slug[1]);
    const product = category.products.find(
      (prod) => prod.slugEn === productSlug || prod.slugRu === productSlug
    );
    if (!product) {
      redirect('/');
    }
    return <AdminProductPage category={category} product={product} />;
  } else {
    return <AdminCategoryPage city={cityResponse.city} category={category} />;
  }
}
