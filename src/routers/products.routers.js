import { Router } from "express";
import { ProductManagerFileBased } from "../main/ProductManager/ProductManagerFileBased.js";

const router = Router();

const PRODUCTS_PATH = "./resources/ProductsMock.json";
const productManager = new ProductManagerFileBased(PRODUCTS_PATH);

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).render("index", {
      title: "Productos",
      products: products,
    });
  } catch (error) {
    return res
      .status(400)
      .render("index", { title: "Productos", errorMessage: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).render("realTimeProducts", {
      title: "Productos en tiempo real",
      products: products,
    });
  } catch (error) {
    return res.status(400).render("index", {
      title: "Productos en tiempo real",
      errorMessage: error.message,
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const foundProduct = await productManager.getProductById(parseInt(pid));
    return res.status(200).send(foundProduct);
  } catch (error) {
    return res
      .status(400)
      .send({ status: "failed", description: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const potentialProduct = req.body;
    await productManager.addProduct(potentialProduct);
    return res.status(201).send({
      status: "success",
      description: "Se agregó correctamente el producto",
    });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "failed", description: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(parseInt(pid));
    return res.status(200).send({
      status: "success",
      description: `Se eliminó correctamente el product con ID ${pid}`,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "failed", description: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const potentialProduct = req.body;
    await productManager.updateProduct(parseInt(pid), potentialProduct);
    return res.status(200).send({
      status: "success",
      description: `Se actualizó correctamente el producto con ID ${pid}`,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "failed", description: error.message });
  }
});

export default router;
