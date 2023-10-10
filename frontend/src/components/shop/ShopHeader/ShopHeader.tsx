import Link from 'next/link';
import './ShopHeader.scss';
import Image from 'next/image';
import CartControl from '../CartControl/CartControl';
import AuthControl from '../AuthControl/AuthControl';
export default function ShopHeader() {
  return (
    <header className="shop-header">
      <div className="shop-header__top">
        <div className="shop-header__company">
          <Link href={'/'} className="shop-header__logo">
            <Image src={'/images/logo.png'} width={100} height={100} alt="" />
          </Link>
          <div className="shop-header__company-links">
            <Link href={'/'} className="shop-header__company-title">
              Company Title
            </Link>
            <a href="tel:+73412222222" className="shop-header__company-phone">
              (3412) 22-22-22
            </a>
            <div className="shop-header__company-social">
              <a href="https://vk.com">
                <Image src={'/images/vk.svg'} width={30} height={30} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="shop-header__controlls">
          <CartControl />
          <AuthControl />
        </div>
      </div>
    </header>
  );
}
