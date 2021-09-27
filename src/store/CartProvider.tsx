import { FC, useReducer } from "react";
import Cart from "../model/Cart";
import Product from "../model/Product";
import CartContext from "./cart-context";

enum ActionType {
  ADD,
  REMOVE,
  CLEAR,
}

type Action =
  | { type: ActionType.ADD; payload: Product }
  | { type: ActionType.REMOVE; payload: string }
  | { type: ActionType.CLEAR };

type Reducer = (state: Cart, action: Action) => Cart;

const defaultCartState: Cart = {
  items: [],
  totalPrice: 0,
};

const cartReducer: Reducer = (state: Cart, action: Action): Cart => {
  switch (action.type) {
    case ActionType.ADD: {
      const updatedTotalAmount = state.totalPrice + action.payload.audPrice;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.productId === action.payload.productId
      );

      let updatedItems;
      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat({
          product: action.payload,
          amount: 1,
        });
      }
      return { items: updatedItems, totalPrice: updatedTotalAmount };
    }
    case ActionType.REMOVE: {
      const itemToRemoveIndex = state.items.findIndex(
        (item) => item.product.productId === action.payload
      );
      const itemToRemove = state.items[itemToRemoveIndex];
      let updatedItems;

      if (itemToRemove.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.product.productId !== action.payload
        );
      } else {
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[itemToRemoveIndex] = updatedItem;
      }

      const updatedTotalAmount =
        state.totalPrice - itemToRemove.product.audPrice;

      return { items: updatedItems, totalPrice: updatedTotalAmount };
    }
    case ActionType.CLEAR: {
      return defaultCartState;
    }
    default:
      return defaultCartState;
  }
};

const CartProvider: FC = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer<Reducer>(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item: Product) => {
    dispatchCartAction({ type: ActionType.ADD, payload: item });
  };

  const removeItemHandler = (id: string) => {
    dispatchCartAction({ type: ActionType.REMOVE, payload: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: ActionType.CLEAR });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
