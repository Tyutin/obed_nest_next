import Carousel from '@commonComponents/Carousel/Carousel';
import ShopItem from '../ShopItem/ShopItem';
import './ShopCategory.scss';
import { ShopCategoryType } from '../../../types/ShopCategory.type';

export default function ShopCategory(props: { category: ShopCategoryType }) {
  const { category } = props;
  if (!category.available) {
    return null;
  }
  const { items } = category;
  return (
    <div className="shop-category">
      <h2 className="shop-category__title">{category.name}</h2>
      <Carousel>
        {items.map((el) => {
          return (
            <ShopItem
              key={el.id}
              title={el.title}
              image={el.image}
              price={el.price}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
