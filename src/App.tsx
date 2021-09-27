import { useState } from "react";
import Header from "./components/Layout/Header";

import "./App.css";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onCartButtonClicked={showCartHandler}></Header>
      <main>
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;
