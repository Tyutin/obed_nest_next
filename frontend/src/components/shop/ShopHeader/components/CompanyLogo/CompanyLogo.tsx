import Image from 'next/image';
import Link from 'next/link';

export const CompanyLogo = (props: {
  className?: string;
  onClick?: () => void;
}) => {
  const { className, onClick } = props;
  return (
    <Link onClick={onClick} href={'/'} className={`${className}`}>
      <Image
        quality={100}
        src={'/images/logo.png'}
        width={100}
        height={100}
        alt=""
      />
    </Link>
  );
};
