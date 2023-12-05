import { Product } from "../../main/Product/Product.js";

test("Create a product", () => {
  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };
  const product = new Product(potentialProd);
  expect(product).toEqual(potentialProd);
});
