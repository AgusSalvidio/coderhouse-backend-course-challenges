import express from "express";
import productRouter from "./routers/products.routers.js";
import __dirname from "../utils.js";
import handlebars from "express-handlebars";

const app = express();
const PORT = 8080;

const configureApp = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));
  app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/views");
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
