import { ShopItemType } from './ShopItem.type';

export type ShopCategoryType = {
  id: number;
  name: string;
  available: boolean;
  slug: string;
  items: ShopItemType[]
}