import { ProductManagerMemoryBased } from "./src/main/ProductManager/ProductManagerMemoryBased.js";
import { ProductManagerFileBased } from "./src/main/ProductManager/ProductManagerFileBased.js";
import { Product } from "./src/main/Product/Product.js";
import { promises as fs } from "node:fs";

const sampleExecutionMemoryBased = () => {
  console.log("Inicio de ejecución de Test en Memoria");
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

  const productManager = new ProductManagerMemoryBased();

  console.log(productManager.getProducts());

  productManager.addProduct(potentialProd);

  console.log(productManager.getProducts());

  productManager.addProduct(potentialProd);

  console.log(productManager.getProductById(1));

  productManager.getProductById(50);

  console.log("Fin de ejecución de Test en Memoria");
};

const sampleExecutionFileBased = async () => {
  console.log("Inicio de ejecución de Test en Archivo");

  const path = "./resources/Products.json";

  const productManager = new ProductManagerFileBased(path);

  const potentialProd = {
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  const updatedProd = new Product({
    title: "Producto actualizado",
    description: "Este es un producto actualizado",
    price: 500,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 45,
  });

  let products = await productManager.getProducts();

  console.log(products);

  await productManager.addProduct(potentialProd);

  products = await productManager.getProducts();

  console.log(products);

  let foundProduct = await productManager.getProductById(1);

  console.log(foundProduct);

  await productManager.updateProduct(1, updatedProd);

  foundProduct = await productManager.getProductById(1);

  console.log(foundProduct);

  await productManager.deleteProduct(1);

  products = await productManager.getProducts();

  console.log(products);

  //To clean the file!
  await fs.writeFile(path, "[]", "utf-8");

  console.log("Fin de ejecución de Test en Archivo");
};

sampleExecutionMemoryBased();
sampleExecutionFileBased();
