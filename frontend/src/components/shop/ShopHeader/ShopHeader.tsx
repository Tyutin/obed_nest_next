import Link from 'next/link';
import './ShopHeader.scss';
import Image from 'next/image';
import CartControl from '../CartControl/CartControl';
import AuthControl from '../AuthControl/AuthControl';
import { getCity } from '@fetch/getData';

const getPhoneHref = (phoneString: string): string => {
  return `+${phoneString.replace(/[^0-9]/g, '')}`;
};

export default async function ShopHeader() {
  const city = (await getCity()).city;
  const {
    companyName,
    phones,
    vkLink,
    telegramLink,
    instagramLink,
    categories,
  } = city;
  const links = {
    vk: (
      <Link href={vkLink} target="_blank">
        <Image
          quality={100}
          src={'/images/social/vk.png'}
          width={30}
          height={30}
          alt=""
        />
      </Link>
    ),
    telegram: (
      <Link href={telegramLink} target="_blank">
        <Image
          quality={100}
          src={'/images/social/tg.png'}
          width={30}
          height={30}
          alt=""
        />
      </Link>
    ),
    inst: (
      <Link href={instagramLink} target="_blank">
        <Image
          quality={100}
          src={'/images/social/inst_30.png'}
          width={30}
          height={30}
          alt=""
        />
      </Link>
    ),
    logo: (
      <Link href={'/'} className="shop-header__logo">
        <Image
          quality={100}
          src={'/images/logo.png'}
          width={100}
          height={100}
          alt=""
        />
      </Link>
    ),
    companyName: (
      <Link href={'/'} className="shop-header__company-title">
        {companyName}
      </Link>
    ),
    phone: <Link href={getPhoneHref(phones[0])}>{phones[0]}</Link>,
    about: <Link href="/о-компании">О компании</Link>,
    delivery: <Link href="/условия-доставки">Доставка</Link>,
    promo: <Link href="/акции">Акции</Link>,
  };
  return (
    <header className="shop-header">
      <div className="shop-header__top">
        <div className="shop-header__company">
          {links.logo}
          <div className="shop-header__company-links">
            {links.companyName}
            {links.phone}
            <div className="shop-header__company-social">
              {vkLink && links.vk}
              {telegramLink && links.telegram}
              {instagramLink && links.inst}
            </div>
          </div>
        </div>
        <div className="shop-header__controlls">
          <CartControl />
          <AuthControl />
        </div>
      </div>
      <nav className="shop-header__nav">
        <ul className="shop-header__nav-pages">
          <li className="shop-header__nav-pages-item">{links.promo}</li>
          <li className="shop-header__nav-pages-item">{links.delivery}</li>
          <li className="shop-header__nav-pages-item">{links.about}</li>
        </ul>
        <ul className="shop-header__nav-categories">
          {categories.map((category) => {
            return (
              <li className="shop-header__categories-item" key={category.id}>
                <Link href={`/#${category.slugRu}`}>{category.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
