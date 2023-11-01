'use client';
import classNames from 'classnames';
import { useCartStore } from '../../../store/cart';
import useStore from '../../../store/useStore';
import { FiShoppingBag } from 'react-icons/fi';
import './CartStrip.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const HIDE_COMPONENT_PAGES = ['/корзина', '/cart'];

const shouldBeVisible = (encodedPathname: string): boolean => {
  const pathname = decodeURI(encodedPathname);
  return !HIDE_COMPONENT_PAGES.some((el) => el === pathname);
};

export default function CartStrip() {
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice);
  const itemsCount = useStore(useCartStore, (state) =>
    state.items.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0)
  );
  const pathname = decodeURIComponent(usePathname());
  const [visible, setVisible] = useState(shouldBeVisible(pathname));
  useEffect(() => {
    setVisible(shouldBeVisible(pathname));
  }, [pathname]);
  if (!visible) {
    return null;
  }
  return (
    <Link
      href={'/корзина'}
      className={classNames('cart-strip', {
        'cart-strip_active': !!itemsCount && itemsCount > 0,
      })}
    >
      <FiShoppingBag size={30} color={'white'} />
      <span className="cart-strip__total-price">{totalPrice}₽</span>
      <span>Заказать</span>
    </Link>
  );
}
