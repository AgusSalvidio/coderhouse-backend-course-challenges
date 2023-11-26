import { ProductManager } from "../ProductManager/ProductManager";
import { jest } from "@jest/globals";

test("Create a ProductManager", () => {
  const productManager = new ProductManager();
  expect(productManager.getProducts()).toEqual([]);
});

test("Add product to ProductManager", () => {
  const productManager = new ProductManager();
  expect(productManager.getProducts()).toEqual([]);

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  productManager.addProduct(potentialProd);
  expect(productManager.getProducts().length).toEqual(1);
  potentialProd.id = 1;
  expect(productManager.getProducts()[0]).toEqual(potentialProd);
});

test("When product not found should raise error", () => {
  const errorConsoleSpy = jest.spyOn(global.console, "error");
  const productManager = new ProductManager();
  expect(productManager.getProducts()).toEqual([]);

  productManager.getProductById(1);
  expect(errorConsoleSpy).toHaveBeenCalledWith("No hay productos");

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  productManager.addProduct(potentialProd);
  expect(productManager.getProducts().length).toEqual(1);

  productManager.getProductById(50);
  expect(errorConsoleSpy).toHaveBeenCalledWith(
    "No se encuentra el producto con ID 50"
  );
});

test("When trying to add a product with the same code should raise error", () => {
  const errorConsoleSpy = jest.spyOn(global.console, "error");
  const productManager = new ProductManager();
  expect(productManager.getProducts()).toEqual([]);

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  productManager.addProduct(potentialProd);
  expect(productManager.getProducts().length).toEqual(1);

  productManager.addProduct(potentialProd);
  expect(errorConsoleSpy).toHaveBeenCalledWith(
    "Ya existe un producto con el código abc123"
  );
});

test("Get product by ID", () => {
  const productManager = new ProductManager();
  expect(productManager.getProducts()).toEqual([]);

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  productManager.addProduct(potentialProd);
  expect(productManager.getProducts().length).toEqual(1);

  productManager.getProductById(1);
  potentialProd.id = 1;
  expect(productManager.getProductById(1)).toEqual(potentialProd);
});

test("When trying to add a product with missing parameters should raise error", () => {
  const errorConsoleSpy = jest.spyOn(global.console, "error");
  const productManager = new ProductManager();
  expect(productManager.getProducts()).toEqual([]);

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    stock: 25,
  };

  productManager.addProduct(potentialProd);
  expect(errorConsoleSpy).toHaveBeenCalledWith("Faltan parámetros");
});
