'use client';
import Link from 'next/link';
import './ShopHeader.scss';
import Image from 'next/image';
import CartControl from '../CartControl/CartControl';
import AuthControl from '../AuthControl/AuthControl';
import { useState } from 'react';
import cn from 'classnames';
import { CityEntityInterface } from '../../../../../shared/types/City/front/CityEntity.interface';

const getPhoneHref = (phoneString: string): string => {
  return `+${phoneString.replace(/[^0-9]/g, '')}`;
};

const CompanyLogo = (props: { className?: string; onClick?: () => void }) => {
  const { className, onClick } = props;
  return (
    <Link
      onClick={onClick}
      href={'/'}
      className={`shop-header__logo ${className}`}
    >
      <Image
        quality={100}
        src={'/images/logo.png'}
        width={100}
        height={100}
        alt=""
      />
    </Link>
  );
};

const HeaderToggle = (props: { isOpen?: boolean; onClick?: () => void }) => {
  const { isOpen, onClick } = props;
  return (
    <button
      className="shop-header__toggle shop-header_visible_mobile"
      onClick={onClick}
    >
      {isOpen ? (
        <Image
          src={'/images/svg/toggle-open.svg'}
          quality={100}
          width={22}
          height={18}
          alt=""
        />
      ) : (
        <Image
          src={'/images/svg/toggle-close.svg'}
          quality={100}
          width={20}
          height={20}
          alt=""
        />
      )}
    </button>
  );
};

interface ShopHeaderProps {
  city: CityEntityInterface;
}

export default function ShopHeader(props: ShopHeaderProps) {
  const { city } = props;
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
    companyName: (
      <Link href={'/'} className="shop-header__company-title">
        {companyName}
      </Link>
    ),
    phone: <Link href={`tel:${getPhoneHref(phones[0])}`}>{phones[0]}</Link>,
    about: (
      <Link
        onClick={() => {
          setMenuIsOpen(false);
        }}
        href="/о-компании"
      >
        О компании
      </Link>
    ),
    delivery: (
      <Link
        onClick={() => {
          setMenuIsOpen(false);
        }}
        href="/условия-доставки"
      >
        Доставка
      </Link>
    ),
    promo: (
      <Link
        onClick={() => {
          setMenuIsOpen(false);
        }}
        href="/акции"
      >
        Акции
      </Link>
    ),
  };
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <header className="shop-header">
      <div className="shop-header__top">
        <div className="shop-header__company">
          <CompanyLogo className="shop-header_visible_tablet" />
          <div className="shop-header__company-links">
            {links.companyName}
            {links.phone}
            <div className="shop-header__company-social shop-header_visible_tablet">
              {vkLink && links.vk}
              {telegramLink && links.telegram}
              {instagramLink && links.inst}
            </div>
          </div>
        </div>
        <div className="shop-header__controlls">
          <AuthControl />
          <div className="shop-header_visible_tablet">
            <CartControl />
          </div>
          <HeaderToggle
            isOpen={true}
            onClick={() => {
              setMenuIsOpen(true);
            }}
          />
        </div>
      </div>
      <div
        className={cn(
          'shop-header__nav-background',
          'shop-header_visible_mobile',
          {
            'shop-header__nav-background_active': menuIsOpen,
          }
        )}
        onClick={() => {
          setMenuIsOpen(false);
        }}
      />
      <nav
        className={cn('shop-header__nav', {
          'shop-header__nav_active': menuIsOpen,
        })}
      >
        <div className="shop-header__toggle-wrapper shop-header_visible_mobile">
          <HeaderToggle
            onClick={() => {
              setMenuIsOpen(false);
            }}
          />
        </div>
        <ul className="shop-header__nav-pages">
          <li className="shop-header__nav-pages-item">{links.promo}</li>
          <li className="shop-header__nav-pages-item">{links.delivery}</li>
          <li className="shop-header__nav-pages-item">{links.about}</li>
        </ul>
        <ul className="shop-header__nav-categories">
          {categories
            .filter((cat) => cat.products.length > 0)
            .map((category) => {
              return (
                <li className="shop-header__categories-item" key={category.id}>
                  <Link
                    onClick={() => {
                      setMenuIsOpen(false);
                    }}
                    href={`/${category.slugRu}`}
                  >
                    {category.title}
                  </Link>
                </li>
              );
            })}
        </ul>
        <div className="shop-header__company shop-header_visible_mobile">
          <CompanyLogo
            onClick={() => {
              setMenuIsOpen(false);
            }}
          />
          <div className="shop-header__company-links">
            {links.phone}
            <div className="shop-header__company-social">
              {vkLink && links.vk}
              {telegramLink && links.telegram}
              {instagramLink && links.inst}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
