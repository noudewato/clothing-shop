import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import {UserProvider} from '../src/contexts/user.context'
import { CategoriesProvider } from "./contexts/category.context";
import { CartProvider } from "./contexts/cart.context";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utlis/stripe/stripe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
