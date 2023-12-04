import { MemoryBasedPersistenceSystem } from "../main/PersistenceSystem/MemoryBasedPersistenceSystem.js";
import { Product } from "../main/Product/Product.js";
import { ProductManager } from "../main/ProductManager/ProductManager.js";
import { jest } from "@jest/globals";

persistenceSystems = () => [new MemoryBasedPersistenceSystem()];

test.each(persistenceSystems())(
  "Create a ProductManager",
  (persistenceSystem) => {
    const productManager = new ProductManager(persistenceSystem);
    expect(productManager.getProducts()).toEqual([]);
  }
);

test.each(persistenceSystems())(
  "Add product to ProductManager",
  (persistenceSystem) => {
    const productManager = new ProductManager(persistenceSystem);
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
  }
);

test.each(persistenceSystems())(
  "When product not found should raise error",
  (persistenceSystem) => {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManager(persistenceSystem);
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
  }
);

test.each(persistenceSystems())(
  "When trying to add a product with the same code should raise error",
  (persistenceSystem) => {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManager(persistenceSystem);
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
  }
);

test.each(persistenceSystems())("Get product by ID", (persistenceSystem) => {
  const productManager = new ProductManager(persistenceSystem);
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

test.each(persistenceSystems())(
  "When trying to add a product with missing parameters should raise error",
  (persistenceSystem) => {
    const errorConsoleSpy = jest.spyOn(global.console, "error");
    const productManager = new ProductManager(persistenceSystem);
    expect(productManager.getProducts()).toEqual([]);

    const potentialProd = {
      title: "Producto prueba",
      description: "Este es un producto prueba",
      stock: 25,
    };

    productManager.addProduct(potentialProd);
    expect(errorConsoleSpy).toHaveBeenCalledWith("Faltan parámetros");
  }
);

test.each(persistenceSystems())("Deleting product", (persistenceSystem) => {
  const productManager = new ProductManager(persistenceSystem);
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

  productManager.deleteProduct(1);

  expect(productManager.getProducts()).toEqual([]);
});

test.each(persistenceSystems())("Updating product", (persistenceSystem) => {
  const productManager = new ProductManager(persistenceSystem);
  expect(productManager.getProducts()).toEqual([]);

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

  productManager.addProduct(potentialProd);
  expect(productManager.getProducts().length).toEqual(1);

  productManager.updateProduct(1, updatedProduct);

  const foundProduct = productManager.getProductById(1);

  expect(productManager.getProducts()).toEqual([foundProduct]);
});
