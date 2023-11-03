import classNames from 'classnames';
import { TbTriangleFilled } from 'react-icons/tb';

import './ProductsToggleButton.scss';

export default function ProductsToggleButton(props: {
  totalItemsCount: number;
  isProductsVisible: boolean;
  setIsProductsVisible: (isVisible: boolean) => void;
}) {
  const { totalItemsCount, isProductsVisible, setIsProductsVisible } = props;
  return (
    <button
      className={classNames([
        'products-toggle-button',
        {
          'products-toggle-button_active': isProductsVisible,
        },
      ])}
      onClick={() => {
        setIsProductsVisible(!isProductsVisible);
      }}
    >
      Позиций: {totalItemsCount}
      <TbTriangleFilled
        size={12}
        color="#bfb7b6"
        className="products-toggle-button__arrow"
      />
    </button>
  );
}
