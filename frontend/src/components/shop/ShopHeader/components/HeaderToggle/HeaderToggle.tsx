import Image from 'next/image';

export const HeaderToggle = (props: {
  isOpen?: boolean;
  onClick?: () => void;
}) => {
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
