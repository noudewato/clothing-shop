import React from "react";
import {Routes, Route } from "react-router-dom"
import Home from "./components/routes/home/home.components";
import Navigation from "./components/routes/navigation/navigation.component";
import Auth from "./components/routes/authentication/auth.component";
import Shop from "./components/routes/shop/shop.component";
import Checkout from "./components/routes/checkout/checkout.component";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
