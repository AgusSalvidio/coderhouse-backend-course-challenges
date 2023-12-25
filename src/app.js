import express from "express";
import productRouter from "./routers/products.routers.js";
import __dirname from "./utils/utils.js";

const app = express();
const PORT = 8080;

const configureApp = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "/public")));
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

const configureEndpoints = () => {
  app.use("/", productRouter);
};

const initializeApp = () => {
  configureApp();
  configureEndpoints();
};

initializeApp();
