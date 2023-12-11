import express from "express";
import { ProductManagerFileBased } from "./main/ProductManager/ProductManagerFileBased.js";

const app = express();
const path = "./resources/ProductsMock.json";

const productManager = new ProductManagerFileBased(path);

const configureApp = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080");
  });
};

const configureEndpoints = () => {
  app.get("/products", async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await productManager.getProducts();
      if (!limit) {
        return res.status(200).send(products);
      } else {
        const filteredProducts = products.slice(0, limit);
        return res.status(200).send(filteredProducts);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });
  app.get("/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const foundProduct = await productManager.getProductById(parseInt(pid));
      return res.status(200).send(foundProduct);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });
};

const initializeApp = () => {
  configureApp();
  configureEndpoints();
};

initializeApp();
