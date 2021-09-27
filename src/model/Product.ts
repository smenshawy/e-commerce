class Product {
  productId: string;
  name: string;
  audPrice: number;
  description?: string;

  constructor(productId: string, name: string, audPrice: number, description: string) {
    this.productId = productId;
    this.name = name;
    this.audPrice = audPrice;
    this.description = description;
  }
}

export default Product;
