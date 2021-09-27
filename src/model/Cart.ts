import CartItem from "./CartItem";

class Cart {
  items: CartItem[];
  totalPrice: number;

  constructor(items: CartItem[], totalPrice: number) {
    this.items = items;
    this.totalPrice = totalPrice;
  }
}

export default Cart;
