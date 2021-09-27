import { FC, useContext } from "react";
import Product from "../../model/Product";
import CartContext from "../../store/cart-context";
import formatPrice from "../../utils/formatPrice";
import classes from "./ProductItem.module.css";

const ProductItem: FC<Product> = ({ productId, name, description, audPrice }) => {
  const cartCtx = useContext(CartContext);

  const formatedPrice = formatPrice(audPrice);

  const AddToCartHandler = () => {
    cartCtx.addItem({ productId: productId, name: name, audPrice: audPrice });
  };

  return (
    <li className={classes.product}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.audPrice}>{formatedPrice}</div>
      </div>
      <button onClick={AddToCartHandler}>+ Add</button>
    </li>
  );
};

export default ProductItem;
