'use client';

import { useEffect, useState } from 'react';
import './ShopShareButton.scss';
import classNames from 'classnames';

export default function ShopShareButton() {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    let timeout;
    if (clicked) {
      timeout = setTimeout(() => {
        setClicked(false);
      }, 2000);
    }
  }, [clicked]);

  const onClickButton = () => {
    const url = decodeURI(window.location.href);
    navigator.clipboard.writeText(url);
    setClicked(true);
  };

  return (
    <div className="share-button">
      <button
        className="share-button__button"
        onClick={onClickButton}
        title="Скопировать ссылку"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.9167 14.5812C22.8866 18.1374 22.6891 20.0979 21.3963 21.3908C19.8704 22.9167 17.4145 22.9167 12.5027 22.9167C7.59101 22.9167 5.13514 22.9167 3.60926 21.3908C2.08337 19.8649 2.08337 17.4091 2.08337 12.4973C2.08337 7.58555 2.08337 5.12968 3.60926 3.60379C4.90211 2.31093 6.86261 2.1135 10.4189 2.08334"
            stroke="#4980DB"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22.9167 7.29168H14.5833C12.69 7.29168 11.5486 8.22086 11.1254 8.64615C10.9944 8.77785 10.9289 8.84372 10.9279 8.84461C10.9271 8.84551 10.8611 8.91104 10.7295 9.04211C10.3042 9.46533 9.375 10.6067 9.375 12.5V15.625M22.9167 7.29168L17.7083 2.08334M22.9167 7.29168L17.7083 12.5"
            stroke="#4980DB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span
        className={classNames('share-button__message', {
          'share-button__message_active': clicked,
        })}
      >
        Скопировано
      </span>
    </div>
  );
}
