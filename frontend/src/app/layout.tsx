import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@assets/styles/global.scss';
import './ShopLayout.scss';
import ShopHeader from '@shopComponents/ShopHeader/ShopHeader';
import ShopFooter from '@shopComponents/ShopFooter/ShopFooter';
import ScrollToTopButton from '@shopComponents/ScrollToTopButton/ScrollToTopButton';
import { getCity } from '@fetch/getData';
import CartStrip from '@shopComponents/CartStrip/CartStrip';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const city = (await getCity()).city;
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="shop-layout">
          <ShopHeader city={city} />
          <main className="shop-layout__page">{children}</main>
          {/* <ShopFooter /> */}
        </div>
        <ScrollToTopButton />
        <CartStrip />
      </body>
    </html>
  );
}
