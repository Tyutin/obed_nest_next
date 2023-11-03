'use client';
import { FiShoppingBag } from 'react-icons/fi';
import './CartControl.scss';
import { useCartStore } from '@store/cart/useCartStore';
import Link from 'next/link';

export default function CartControl() {
  const itemsCount = useCartStore((state) =>
    state.items.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0)
  );
  return (
    <Link href={'/корзина'} className="cart-control">
      <FiShoppingBag size={28} color={'white'} />
      {!!itemsCount && itemsCount > 0 && (
        <div className="cart-control__counter">
          <span>{itemsCount}</span>
        </div>
      )}
    </Link>
  );
}
