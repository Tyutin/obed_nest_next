'use client';

import { useProductStore } from '@store/product/useProductStore';
import { ProductEntityInterface } from '../../../../../shared/types/Product/front/ProductEntity.interface';
import { useCartStore } from '@store/cart/useCartStore';
import { CartState } from '@store/cart/types';

export default function ZustangState(props: {
  products: ProductEntityInterface[];
  cartCookie: string;
}) {
  const { products, cartCookie } = props;
  useProductStore.setState({ products });
  if (cartCookie) {
    try {
      const parsedState: CartState = JSON.parse(cartCookie);
      parsedState.items = parsedState.items.filter((item) => {
        const product = products.find((product) => product.id === item.id);
        return item.count > 0 && !!product;
      });
      useCartStore.setState(parsedState);
    } catch {
      useCartStore.setState({ items: [] });
    }
  }
  return <></>;
}
