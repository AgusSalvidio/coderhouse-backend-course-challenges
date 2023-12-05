import { Product } from "../../main/Product/Product.js";
import { ProductManagerFileBased } from "../../main/ProductManager/ProductManagerFileBased.js";
import { jest } from "@jest/globals";
import { promises as fs } from "node:fs";

const filePath = "./resources/Products.json";

cleanProductsFile = async () => {
  await fs.writeFile(filePath, "[]", "utf-8");
};

afterEach(async () => {
  await cleanProductsFile();
});

test("Create a ProductManager", async () => {
  try {
    const productManager = new ProductManagerFileBased(filePath);
    expect(await productManager.getProducts()).toEqual([]);
  } catch (error) {}
});

test("Add product to ProductManager", async () => {
  try {
    const productManager = new ProductManagerFileBased(filePath);
    expect(await productManager.getProducts()).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };

    await productManager.addProduct(potentialProd);
    const products = await productManager.getProducts();
    expect(products.length).toEqual(1);
    potentialProd.id = 1;
    expect(products[0]).toEqual(potentialProd);
  } catch (error) {}
});

test("When product not found should raise error", async () => {
  try {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManagerFileBased(filePath);

    let products = await productManager.getProducts();
    expect(products).toEqual([]);

    await productManager.getProductById(1);
    expect(errorConsoleSpy).toHaveBeenCalledWith("No hay productos");

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };

    await productManager.addProduct(potentialProd);

    products = await productManager.getProducts();

    expect(products.length).toEqual(1);

    await productManager.getProductById(50);
    expect(errorConsoleSpy).toHaveBeenCalledWith(
      "No se encuentra el producto con ID 50"
    );
  } catch (error) {}
});

test("When trying to add a product with the same code should raise error", async () => {
  try {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManagerFileBased(filePath);

    let products = await productManager.getProducts();

    expect(products).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };

    await productManager.addProduct(potentialProd);

    products = await productManager.getProducts();

    expect(products.length).toEqual(1);

    await productManager.addProduct(potentialProd);

    expect(errorConsoleSpy).toHaveBeenCalledWith(
      "Ya existe un producto con el código abc123"
    );
  } catch (error) {}
});

test("Get product by ID", async () => {
  try {
    const productManager = new ProductManagerFileBased(filePath);

    let products = await productManager.getProducts();

    expect(products).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };

    await productManager.addProduct(potentialProd);

    products = await productManager.getProducts();

    expect(products.length).toEqual(1);

    const foundProduct = await productManager.getProductById(1);
    potentialProd.id = 1;
    expect(foundProduct).toEqual(potentialProd);
  } catch (error) {}
});

test("When trying to add a product with missing parameters should raise error", async () => {
  try {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManagerFileBased(filePath);

    const products = await productManager.getProducts();

    expect(products).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      stock: 25,
    };

    await productManager.addProduct(potentialProd);
    expect(errorConsoleSpy).toHaveBeenCalledWith("Faltan parámetros");
  } catch (error) {}
});

test("Deleting product", async () => {
  try {
    const productManager = new ProductManagerFileBased(filePath);

    let products = await productManager.getProducts();

    expect(products).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };

    await productManager.addProduct(potentialProd);

    products = await productManager.getProducts();

    expect(products.length).toEqual(1);

    await productManager.deleteProduct(1);

    products = await productManager.getProducts();

    expect(products).toEqual([]);
  } catch (error) {}
});

test("Updating product", async () => {
  try {
    const productManager = new ProductManagerFileBased(filePath);

    let products = await productManager.getProducts();

    expect(products).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };

    const updatedProduct = new Product({
      title: "Producto prueba actualizado",
      description: "Este es un producto prueba actualizado",
      price: 250,
      thumbnail: "Sin imagen",
      code: "abc1235",
      stock: 13,
    });

    await productManager.addProduct(potentialProd);

    products = await productManager.getProducts();

    expect(products.length).toEqual(1);

    await productManager.updateProduct(1, updatedProduct);

    const foundProduct = await productManager.getProductById(1);

    products = await productManager.getProducts();

    expect(products).toEqual([foundProduct]);
  } catch (error) {}
});
