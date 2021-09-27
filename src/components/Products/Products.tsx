import { FC, useEffect, useState } from "react";
import Card from "../UI/Card";
import ProductItem from "./ProductItem";
import Product from "../../model/Product";
import getErrorDescription from "../../utils/getErrorDescription";
import classes from "./Products.module.css";
import Status, { StatusType } from "../UI/Status";
import urls from "../../constants/urls";

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${urls.BASE_URL}${urls.PRODUCTS_API}?token=${process.env.REACT_APP_API_TOKEN}`
        );
        if (!response.ok) {
          throw new Error(getErrorDescription(response.status));
        }

        const loadedProducts = await response.json();
        setProducts(loadedProducts);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const productsList = (
    <ul>
      {products.map(({ productId, name, description, audPrice }) => (
        <ProductItem
          key={productId}
          productId={productId}
          name={name}
          description={description}
          audPrice={audPrice}
        ></ProductItem>
      ))}
    </ul>
  );
  return (
    <section className={classes.products}>
      <Card>
        {error && <Status type={StatusType.Error}>{error.message}</Status>}
        {isLoading && <Status type={StatusType.Loading}/>}
        {!isLoading && !error && productsList}
      </Card>
    </section>
  );
};

export default Products;
