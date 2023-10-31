import { getCity } from '@fetch/getData';

import ShopCategoryPage from '@shopComponents/pages/ShopCategoryPage/ShopCategoryPage';
import ShopProductPage from '@shopComponents/pages/ShopProductPage/ShopProductPage';
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
  const cityResponse = await getCity();
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
    return <ShopProductPage category={category} product={product} />;
  } else {
    return <ShopCategoryPage category={category} />;
  }
}
