import { ProductManagerMemoryBased } from "./src/main/ProductManager/ProductManagerMemoryBased.js";
import { ProductManagerFileBased } from "./src/main/ProductManager/ProductManagerFileBased.js";

import { promises as fs } from "node:fs";

const initializeSampleExecutionWith = (aProductManager) => {
  /* I replicate the same that has been already created for a test, to allow to play with the
   code without adding new tests and complying with the exercise statement. -asalvidio */

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  const productManager = aProductManager;

  console.log(productManager.getProducts());

  productManager.addProduct(potentialProd);

  console.log(productManager.getProducts());

  productManager.addProduct(potentialProd);

  console.log(productManager.getProductById(1));

  productManager.getProductById(50);
};

const sampleExecutionMemoryBased = () => {
  initializeSampleExecutionWith(new ProductManagerMemoryBased());
};

const sampleExecutionFileBased = async () => {
  const path = "./resources/Products.json";
  //initializeSampleExecutionWith(new ProductManagerFileBased(path));

  const productManager = new ProductManagerFileBased(path);

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  console.log(await productManager.getProducts());
};

sampleExecutionMemoryBased();
//sampleExecutionFileBased();
