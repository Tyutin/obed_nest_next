import { CityEntityInterface } from '../../../../../../shared/types/City/front/CityEntity.interface';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

type Links = {
  vk: ReactNode;
  telegram: ReactNode;
  inst: ReactNode;
  companyName: ReactNode;
  phone: ReactNode;
  about: ReactNode;
  delivery: ReactNode;
  promo: ReactNode;
};

export function getLinks(
  city: CityEntityInterface,
  closeFunc: () => void
): Links {
  const { companyName, phones, vkLink, telegramLink, instagramLink } = city;
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
      <Link href="/о-компании" onClick={() => closeFunc()}>
        О компании
      </Link>
    ),
    delivery: (
      <Link href="/условия-доставки" onClick={() => closeFunc()}>
        Доставка
      </Link>
    ),
    promo: (
      <Link href="/акции" onClick={() => closeFunc()}>
        Акции
      </Link>
    ),
  };
  return links;
}

const getPhoneHref = (phoneString: string): string => {
  return `+${phoneString.replace(/[^0-9]/g, '')}`;
};
