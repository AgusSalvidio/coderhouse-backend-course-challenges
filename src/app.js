import express from "express";
import {
  productManager,
  router as productRouter,
} from "./routers/products.routers.js";
import __dirname from "../utils.js";
import handlebars from "express-handlebars";
import { readFileSync } from "node:fs";
import { Server as ServerIO } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8080;
const URL = `http://localhost:${PORT}`;

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
};

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

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

const io = new ServerIO(httpServer);

io.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("deleteProductEvent", (potentialProductIDToDelete) => {
    fetch(URL + `/${parseInt(potentialProductIDToDelete)}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        fetch(URL + "/allproducts", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((products) => {
            socket.emit("updateProductTableEvent", products);
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  });
  socket.on("addProductEvent", (potentialProductToAdd) => {
    fetch(URL, {
      method: "POST",
      body: JSON.stringify(potentialProductToAdd),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        fetch(URL + "/allproducts", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((products) => {
            socket.emit("updateProductTableEvent", products);
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  });
});
