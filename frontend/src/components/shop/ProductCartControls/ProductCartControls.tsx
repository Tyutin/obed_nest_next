'use client';
import './ProductCartControls.scss';
import { ProductEntityInterface } from '../../../../../shared/types/Product/front/ProductEntity.interface';
import { useCartStore } from '../../../store/cart';
import useStore from '../../../store/useStore';

export default function ProductCartControls(props: {
  product: ProductEntityInterface;
}) {
  const { product } = props;
  const addProductToCart = useCartStore((state) => state.addItem);
  const removeProductFromCart = useCartStore((state) => state.decrementItem);
  const productInCart = useStore(useCartStore, (state) =>
    state.items.find((item) => item.id === product.id)
  );
  return (
    <div className="product-cart-controls">
      {(!productInCart || productInCart?.count === 0) && (
        <button
          className="product-cart-controls__add-to-cart"
          onClick={() => addProductToCart(product)}
        >
          В Корзину
        </button>
      )}
      {!!productInCart && productInCart.count > 0 && (
        <div className="product-cart-controls__counter-block">
          <button
            className="product-cart-controls__counter-button"
            onClick={() => removeProductFromCart(product)}
          >
            -
          </button>
          <span className="product-cart-controls__counter-number">
            {productInCart?.count}
          </span>
          <button
            className="product-cart-controls__counter-button product-cart-controls__counter-button_add"
            onClick={() => addProductToCart(product)}
          >
            +
          </button>
        </div>
      )}
      {/* {productInCart?.count === 0 ? (
        <button
          className="product-cart-controls__add-to-cart"
          onClick={() => addProductToCart(product)}
        >
          В Корзину
        </button>
      ) : (
        <div className="product-cart-controls__counter-block">
          <button
            className="product-cart-controls__counter-button"
            onClick={() => removeProductFromCart(product)}
          >
            -
          </button>
          <span className="product-cart-controls__counter-number">
            {productInCart?.count}
          </span>
          <button
            className="product-cart-controls__counter-button product-cart-controls__counter-button_add"
            onClick={() => addProductToCart(product)}
          >
            +
          </button>
        </div>
      )} */}
    </div>
  );
}
