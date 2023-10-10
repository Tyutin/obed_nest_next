export type ShopItemType = {
  id: number;
  title: string;
  image: string;
  price: number;
  slug: string;
  available: boolean;
  startAvailableTime: Date;
  endAvailableTime: Date;
  categoryId: number;
}