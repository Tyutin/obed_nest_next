import PromotionSlider from '@shopComponents/PromotionSlider/PromotionSlider';
import './ShopPage.scss';
import ShopCategory from '@shopComponents/ShopCategory/ShopCategory';
import { ShopCategoryType } from '../types/ShopCategory.type';

const categories: ShopCategoryType[] = [
  {
    id: 1,
    name: 'Супы',
    available: true,
    slug: 'supy',
    items: [
      {
        id: 1,
        title: 'Борщ',
        image: '/images/items/item.png',
        price: 189,
        slug: 'borch',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 1,
      },
      {
        id: 2,
        title: 'Солянка',
        image: '/images/items/item.png',
        price: 189,
        slug: 'solyanka',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 1,
      },
      {
        id: 3,
        title: 'Щщи',
        image: '/images/items/item.png',
        price: 18,
        slug: 'schi',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 1,
      },
      {
        id: 4,
        title: 'Рассольник',
        image: '/images/items/item.png',
        price: 1823,
        slug: 'rassolnik',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 1,
      },
      {
        id: 5,
        title: 'Уха',
        image: '/images/items/item.png',
        price: 823,
        slug: 'uha',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Гарниры',
    available: true,
    slug: 'garniry',
    items: [
      {
        id: 1,
        title: 'Гречка',
        image: '/images/items/item.png',
        price: 189,
        slug: 'grechka',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 2,
      },
      {
        id: 2,
        title: 'Макароны',
        image: '/images/items/item.png',
        price: 189,
        slug: 'makarony',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 2,
      },
      {
        id: 3,
        title: 'Пшенка',
        image: '/images/items/item.png',
        price: 18,
        slug: 'pshenka',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 2,
      },
      {
        id: 4,
        title: 'Лапша',
        image: '/images/items/item.png',
        price: 1823,
        slug: 'lapsha',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'Вторые блюда',
    available: true,
    slug: 'vtorye-blyuda',
    items: [
      {
        id: 1,
        title: 'Сосиски',
        image: '/images/items/item.png',
        price: 189,
        slug: 'sosiski',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 3,
      },
      {
        id: 2,
        title: 'Отбивная',
        image: '/images/items/item.png',
        price: 189,
        slug: 'otbivnaya',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 3,
      },
      {
        id: 3,
        title: 'Гуляш',
        image: '/images/items/item.png',
        price: 18,
        slug: 'gulyash',
        available: true,
        startAvailableTime: new Date(),
        endAvailableTime: new Date(),
        categoryId: 3,
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="shop-page">
      <PromotionSlider />
      {categories.map((cat) => {
        return <ShopCategory key={cat.id} category={cat} />;
      })}
    </div>
  );
}
