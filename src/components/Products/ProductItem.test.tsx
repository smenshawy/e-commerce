import { render, screen } from "@testing-library/react";
import ProductItem from "./ProductItem";
import formatPrice from "../../utils/formatPrice";

test("renders product item", () => {
  const fakeProductItem = {
    productId: "bcf1371f-0eac-472b-83d0-efde4a0515e8",
    name: "Honeydew",
    description: "Yellow skinned melon with white or green flesh.",
    audPrice: 2.3,
  };
  render(<ProductItem {...fakeProductItem} />);
  expect(screen.getByRole("listitem")).toBeInTheDocument();
  expect(screen.getByText(fakeProductItem.name)).toBeInTheDocument();
  expect(screen.getByText(fakeProductItem.description)).toBeInTheDocument();
  expect(
    screen.getByText(formatPrice(fakeProductItem.audPrice))
  ).toBeInTheDocument();
});
