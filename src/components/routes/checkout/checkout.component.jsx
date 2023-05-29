import React, { useContext } from "react";
import "./checkout.styles.scss";
import { CartContext } from "../../../contexts/cart.context";
import CheckoutItem from "../../checkout-item/checkout-item.component";
import PaymentForm from "../../payment-form/payment-form.component";

const Checkout = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="checkout-block">
          <span>Product</span>
        </div>
        <div className="checkout-block">
          <span>Description</span>
        </div>
        <div className="checkout-block">
          <span>Quantity</span>
        </div>
        <div className="checkout-block">
          <span>Price</span>
        </div>
        <div className="checkout-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="checkout-footer">
        <span className="checkout-footer-content">Clear Cart</span>
        <span className="checkout-footer-content">Total: {cartTotalPrice}</span>
      </div>

      <PaymentForm/>
    </div>
  );
};

export default Checkout;
