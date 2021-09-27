import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Products from "./Products";
import urls from "../../constants/urls";

const fakeProducts = [
  {
    productId: "bcf1371f-0eac-472b-83d0-efde4a0515e8",
    name: "Honeydew",
    description: "Yellow skinned melon with white or green flesh.",
    audPrice: 2.3,
    stockOnHand: 30,
  },
  {
    productId: "59133a06-5a12-4c65-8612-78a8b5567cd7",
    name: "Kiwi Fruit",
    description:
      "Oval shaped fruit, tapering at one end, with thin, brown, furry skin and gold-coloured flesh. Imported from New Zealand.",
    audPrice: 0.98,
    stockOnHand: 200,
  },
];

const server = setupServer(
  rest.get(`${urls.BASE_URL}${urls.PRODUCTS_API}`, (req, res, ctx) => {
    return res(ctx.json(fakeProducts));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays products", async () => {
  render(<Products />);

  const list = await waitFor(() => screen.getByRole("list"));

  const { getAllByRole } = within(list);
  const items = getAllByRole("listitem");
  expect(items.length).toBe(fakeProducts.length);
});

test("handles invalid token", async () => {
  server.use(
    rest.get(`${urls.BASE_URL}${urls.PRODUCTS_API}`, (req, res, ctx) => {
      return res(ctx.status(403));
    })
  );

  render(<Products />);

  await waitFor(() => screen.getByText(/^invalid token$/i));

  expect(screen.queryByRole("list")).toBeNull();
});
