import express from "express";
import productRouter from "./routers/products.routers.js";
import __dirname from "../utils.js";
import handlebars from "express-handlebars";
import { readFileSync } from "node:fs";

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
      helpers: {
        json: (anObject) => {
          return JSON.stringify(anObject);
        },
        headMeta: () => {
          return configureTemplateCustomHelperFor("headMeta");
        },
        scripts: () => {
          return configureTemplateCustomHelperFor("scripts");
        },
      },
    })
  );
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/views");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

const configureTemplateCustomHelperFor = (aTemplateName) => {
  const filePath = __dirname + `/views/${aTemplateName}.hbs`;
  const fileContent = readFileSync(filePath, "utf8");
  return fileContent;
};

const configureEndpoints = () => {
  app.use("/", productRouter);
};

const initializeApp = () => {
  configureApp();
  configureEndpoints();
};

initializeApp();
