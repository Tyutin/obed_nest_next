'use-client';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';
// import ShopItem from '@shopComponents/ShopItem/ShopItem';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';

import 'swiper/css/bundle';
import './ShopProductSwiper.scss';
import { ProductEntityInterface } from '../../../../../../shared/types/Product/front/ProductEntity.interface';

function SkeletonSwiper(props: { products: ProductEntityInterface[] }) {
  const { products } = props;
  return (
    <div className="shop-product-swiper">
      <div className="shop-product-swiper__skeleton-list">
        {products.map((product) => {
          return (
            <div
              className="shop-product-swiper__skeleton-list-item"
              key={product.id}
            >
              <div className="shop-product-swiper__product-wrapper">
                {/* <ShopItem product={product} /> */}
              </div>
            </div>
          );
        })}
      </div>
      <button className="shop-product-swiper__button-next" />
      <button className="shop-product-swiper__button-prev" />
    </div>
  );
}

export default function ShopProductSwiper(props: {
  products: ProductEntityInterface[];
}) {
  const { products } = props;
  const [display, setDisplay] = useState({
    swiper: { display: 'none' },
    showSkeleton: true,
  });

  const [swiper, setSwiper] = useState<SwiperClass>();
  const nextSlide = () => {
    swiper?.slideNext();
  };
  const prevSlide = () => {
    swiper?.slidePrev();
  };

  const swiperSettings: SwiperProps = {
    slidesPerView: 'auto',
    slidesPerGroup: 3,
    modules: [Pagination],
    cssMode: true,
    onInit: () => {
      setDisplay({
        swiper: { display: '' },
        showSkeleton: false,
      });
    },
    pagination: {
      el: '.shop-product-swiper__pagination',
      clickable: true,
    },
    onSwiper: (swiper) => {
      setSwiper(swiper);
    },
    autoHeight: true,
    breakpoints: {
      1000: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      300: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  };

  const swiperElement = (
    <div className="shop-product-swiper" style={display.swiper}>
      <Swiper {...swiperSettings}>
        {products.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="shop-product-swiper__product-wrapper">
                {/* <ShopItem product={product} /> */}
              </div>
            </SwiperSlide>
          );
        })}
        <div className="shop-product-swiper__pagination" />
      </Swiper>
      <button
        className="shop-product-swiper__button-next"
        onClick={nextSlide}
      />
      <button
        className="shop-product-swiper__button-prev"
        onClick={prevSlide}
      />
    </div>
  );
  return (
    <>
      {display.showSkeleton && <SkeletonSwiper products={products} />}
      {swiperElement}
    </>
  );
}
