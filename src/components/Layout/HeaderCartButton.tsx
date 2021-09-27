import { FC, useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const [btnIsBumped, setBtnIsBumped] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsBumped(true);
    const timer = setInterval(() => {
      setBtnIsBumped(false);
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${btnIsBumped && classes.bump}`;

  return (
    <button className={btnClasses} onClick={onClick} aria-label="Go to the cart">
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems.toString()}</span>
    </button>
  );
};

export default HeaderCartButton;
