import { FC } from "react";
import classes from "./CartItem.module.css";
import CartItemModel from "../../model/CartItem";

const CartItem: FC<{
  cartItem: CartItemModel;
  onAdd: () => void;
  onRemove: () => void;
}> = ({ cartItem, onAdd, onRemove }) => {
  const audPrice = `$${cartItem.product.audPrice.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{cartItem.product.name}</h2>
        <div className={classes.summary}>
          <span className={classes.audPrice}>{audPrice}</span>
          <span className={classes.amount}>x {cartItem.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove} aria-label="Remove product from the car">−</button>
        <button onClick={onAdd} aria-label="Add product to the cart">+</button>
      </div>
    </li>
  );
};

export default CartItem;
