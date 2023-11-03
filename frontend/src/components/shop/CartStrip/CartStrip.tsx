'use client';
import classNames from 'classnames';
import { FiShoppingBag } from 'react-icons/fi';
import './CartStrip.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '@store/cart/useCartStore';
import { useProductStore } from '@store/product/useProductStore';
import { ProductEntityInCart } from '@store/product/types';

const HIDE_COMPONENT_PAGES = [
  '/корзина',
  '/cart',
  '/оформление-заказа',
  '/checkout',
];

const shouldBeVisible = (encodedPathname: string): boolean => {
  const pathname = decodeURI(encodedPathname);
  return !HIDE_COMPONENT_PAGES.some((el) => el === pathname);
};

export default function CartStrip() {
  const pathname = decodeURIComponent(usePathname());
  const [visible, setVisible] = useState(shouldBeVisible(pathname));
  useEffect(() => {
    setVisible(shouldBeVisible(pathname));
  }, [pathname]);

  const items = useCartStore((state) => state.items);
  const cityProducts = useProductStore((state) => state.products);
  const itemsToShow = items.map((item) => {
    const cityProduct = cityProducts.find((product) => product.id === item.id);
    return { ...cityProduct, count: item.count } as ProductEntityInCart;
  });
  const totalPrice = itemsToShow.reduce((acc, curr) => {
    return acc + curr.count * curr.price;
  }, 0);

  if (!visible) {
    return null;
  }
  return (
    <Link
      href={'/корзина'}
      className={classNames('cart-strip', {
        'cart-strip_active': !!items && !!items.length,
      })}
    >
      <FiShoppingBag size={30} color={'white'} />
      <span className="cart-strip__total-price">{totalPrice}₽</span>
      <span>Заказать</span>
    </Link>
  );
}
