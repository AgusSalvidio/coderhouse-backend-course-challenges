import { ProductManager } from "./ProductManager/ProductManager.js";

const sampleExecution = () => {
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

  const productManager = new ProductManager();

  console.log(productManager.getProducts());

  productManager.addProduct(potentialProd);

  console.log(productManager.getProducts());

  productManager.addProduct(potentialProd);

  console.log(productManager.getProductById(1));

  productManager.getProductById(50);
};

sampleExecution();
