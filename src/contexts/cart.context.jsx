import { createContext, useEffect, useState } from "react";

const addToCartItem = (cartItems, productToAdd) => {
  // check if there is an existing product in cart

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //increment existing cartItem in cart if exist or add new if it doesn't
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //add new product to empty cart
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemRemove.id);
};

const decreaseCartItem = (cartItems, cartItemDecrease) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemDecrease.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemDecrease.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  decreaseItemQtyFromCart: () => { },
  cartTotalPrice: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addToCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemRemove));
  };

  const decreaseItemQtyFromCart = (cartItemDecrease) => {
    setCartItems(decreaseCartItem(cartItems, cartItemDecrease));
  };

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const cartItemsTotalPrice = cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
    setCartTotalPrice(cartItemsTotalPrice)
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    decreaseItemQtyFromCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    cartTotalPrice
  };
  return <CartContext.Provider value={value}>{children} </CartContext.Provider>;
};
