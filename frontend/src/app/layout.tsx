import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@assets/styles/global.scss';
import './ShopLayout.scss';
import ShopHeader from '@shopComponents/ShopHeader/ShopHeader';
import ShopFooter from '@shopComponents/ShopFooter/ShopFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="shop-layout">
          {/* <ShopHeader /> */}
          <main className="shop-layout__page">{children}</main>
          {/* <ShopFooter /> */}
        </div>
      </body>
    </html>
  );
}
