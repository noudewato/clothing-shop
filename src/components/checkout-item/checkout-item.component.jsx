import React from "react";
import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  const { removeItemFromCart, decreaseItemQtyFromCart, addItemToCart } = useContext(CartContext);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span
          className="decrement"
          onClick={() => decreaseItemQtyFromCart(cartItem)}
        >
          -
        </span>
        <span className="">{quantity}</span>
        <span
          className="increment"
          onClick={() => addItemToCart(cartItem)}
        >
          +
        </span>
      </div>

      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => removeItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
