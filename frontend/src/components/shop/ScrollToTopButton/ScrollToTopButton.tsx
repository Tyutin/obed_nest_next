/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';

import './ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Определяем, когда показывать кнопку "Наверх"
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Плавно прокручиваем страницу вверх
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Добавляем слушатель события прокрутки страницы
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`scroll-to-top-button ${
        isVisible
          ? 'scroll-to-top-button_visible'
          : 'scroll-to-top-button_hidden'
      }`}
      onClick={scrollToTop}
    >
      <img
        src="/images/svg/arrow-to-top.png"
        alt=""
        className="scroll-to-top-image"
      />
    </div>
  );
};

export default ScrollToTopButton;
