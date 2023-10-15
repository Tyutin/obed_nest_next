import PromotionSlider from '@shopComponents/PromotionSlider/PromotionSlider';
import './ShopPage.scss';
import ShopCategories from '@shopComponents/ShopCategories/ShopCategories';

export default function Home() {
  return (
    <div className="shop-page">
      {/* <PromotionSlider /> */}
      <ShopCategories />
    </div>
  );
}
