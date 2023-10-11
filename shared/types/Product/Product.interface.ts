export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  weight: number;
  slug: string;
  slugRu: string;
  published: boolean;
  startAvailableTime: Date;
  endAvailableTime: Date;
}