import React, { useContext } from "react";
import "./cartDropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const navigateToCheckout = () => {
   navigate('/checkout')
  }


  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{cartItems.length ? cartItems.map(item => (<CartItem key={item.id} cartItem={item} />)) : <span className="empty-message">Your cart is empty</span>}</div>
      <Button buttonType="inverted" onClick={navigateToCheckout}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
