import { FC, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Product from "../../model/Product";
import classes from "./Cart.module.css";
import getErrorDescription from "../../utils/getErrorDescription";
import Status, { StatusType } from "../UI/Status";
import urls from "../../constants/urls";

const Cart: FC<{ onClose: () => void }> = ({ onClose }) => {
  const cartCtx = useContext(CartContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: Product) => {
    cartCtx.addItem(item);
  };

  const onOrderClickHandler = async () => {
    setIsLoading(true);
    setError(null);
    setSucceeded(false);
    try {
      const response = await fetch(
        `${urls.BASE_URL}${urls.CHECKOUT_API}?token=${process.env.REACT_APP_API_TOKEN}`,
        {
          method: "POST",
          body: JSON.stringify({
            items: cartCtx.items,
          }),
          headers: { ContentType: "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(getErrorDescription(response.status));
      }

      setSucceeded(true);

      cartCtx.clearCart();
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  };

  const cartItemsList = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.product.productId}
          cartItem={{ product: item.product, amount: item.amount }}
          onRemove={cartItemRemoveHandler.bind(null, item.product.productId)}
          onAdd={cartItemAddHandler.bind(null, item.product)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={onClose}>
      {error && <Status type={StatusType.Error}>{error.message}</Status>}
      {isLoading && <Status type={StatusType.Loading} />}
      {succeeded && <Status type={StatusType.Success}>Order confirmed</Status>}
      {cartItemsList}
      {!succeeded && (
        <div className={classes.total}>
          <span>Total amount</span>
          <span>${cartCtx.totalPrice.toFixed(2)}</span>
        </div>
      )}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button className={classes.button} onClick={onOrderClickHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
