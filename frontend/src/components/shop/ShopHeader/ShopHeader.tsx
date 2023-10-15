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
  const { companyName, phones, vkLink, telegramLink, instagramLink } = city;
  return (
    <header className="shop-header">
      <div className="shop-header__top">
        <div className="shop-header__company">
          <Link href={'/'} className="shop-header__logo">
            <Image src={'/images/logo.png'} width={100} height={100} alt="" />
          </Link>
          <div className="shop-header__company-links">
            <Link href={'/'} className="shop-header__company-title">
              {companyName}
            </Link>
            <Link href={getPhoneHref(phones[0])}>{phones[0]}</Link>
            <div className="shop-header__company-social">
              {vkLink && (
                <Link href={vkLink}>
                  <Image src={'/images/vk.svg'} width={30} height={30} alt="" />
                </Link>
              )}
              {telegramLink && (
                <Link href={telegramLink}>
                  <Image src={'/images/vk.svg'} width={30} height={30} alt="" />
                </Link>
              )}
              {instagramLink && (
                <Link href={instagramLink}>
                  <Image src={'/images/vk.svg'} width={30} height={30} alt="" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="shop-header__controlls">
          <CartControl />
          <AuthControl />
        </div>
      </div>
      {JSON.stringify(city.phones)}
    </header>
  );
}
