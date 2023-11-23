'use client';

import {
  SettingOutlined,
  ShoppingCartOutlined,
  DatabaseOutlined,
  PercentageOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CityEntityInterface } from '../../../../../shared/types/City/front/CityEntity.interface';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface AdminMenuProps {
  city: CityEntityInterface;
}

export default function AdminMenu(props: AdminMenuProps) {
  const { city } = props;
  const router = useRouter();
  const items = getMenuItems(city, router);
  return (
    <Menu
      // style={{ width: 256 }}
      // defaultSelectedKeys={['about']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
}

function getMenuItems(
  city: CityEntityInterface,
  router: AppRouterInstance
): ItemType[] {
  const categoriesMenuItems: ItemType[] = city.categories.map((cat) => {
    const path = `/admin/categories/${cat.slugEn}`;
    return {
      label: cat.title,
      key: path,
      onClick: () => {
        router.push(path);
      },
    };
  });
  const links: {
    text: string;
    href: string;
    icon: React.ReactNode;
    children?: ItemType[];
  }[] = [
    {
      text: 'О компании',
      href: '/admin',
      icon: <SettingOutlined />,
    },
    {
      text: 'Категории',
      href: '/admin/categories',
      icon: <DatabaseOutlined />,
      children: categoriesMenuItems,
    },
    {
      text: 'Доставка',
      href: '/admin/delivery',
      icon: <ShoppingCartOutlined />,
    },
    {
      text: 'Акции',
      href: '/admin/promo',
      icon: <PercentageOutlined />,
    },
    {
      text: 'Выход',
      href: '/',
      icon: <RollbackOutlined />,
    },
  ];

  return links.map((el) => {
    if (el.children) {
      return {
        icon: el.icon,
        label: el.text,
        key: el.href,
        children: el.children,
      };
    } else {
      return {
        icon: el.icon,
        label: el.text,
        key: el.href,
        onClick: () => {
          router.push(el.href);
        },
      };
    }
  });
}
