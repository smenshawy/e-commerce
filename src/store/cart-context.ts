import { createContext } from "react";
import CartItem from "../model/CartItem";
import Product from "../model/Product";

const CartContext = createContext<{
  items: CartItem[];
  totalPrice: number;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}>({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
