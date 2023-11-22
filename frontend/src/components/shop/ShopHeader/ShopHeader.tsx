'use client';
import Link from 'next/link';
import './ShopHeader.scss';
import CartControl from '../CartControl/CartControl';
import AuthControl from '../AuthControl/AuthControl';
import { useState } from 'react';
import cn from 'classnames';
import { CityEntityInterface } from '../../../../../shared/types/City/front/CityEntity.interface';
import { CompanyLogo } from './components/CompanyLogo/CompanyLogo';
import { getLinks } from './helpers/links';
import { HeaderToggle } from './components/HeaderToggle/HeaderToggle';
import { Session } from 'next-auth';

interface ShopHeaderProps {
  city: CityEntityInterface;
  session: Session | null;
  isAdmin: boolean;
}

export default function ShopHeader(props: ShopHeaderProps) {
  const { city, session, isAdmin } = props;
  const { vkLink, telegramLink, instagramLink, categories } = city;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const links = getLinks(city, () => setMenuIsOpen(false));

  return (
    <header className="shop-header">
      {isAdmin && (
        <div className="shop-header__admin">
          <Link href={'/admin'}>Панель администратора</Link>
        </div>
      )}
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
          <AuthControl session={session} />
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
