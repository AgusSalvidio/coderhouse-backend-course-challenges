import { Product } from "../Product/Product.js";
import { promises as fs } from "node:fs";

export class ProductManagerFileBased {
  constructor(path) {
    this.path = path;
  }

  assertSatisfiesAllRequiredParameters = ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      throw new Error("Faltan parámetros");
  };

  async assertCodeIsNotAlreadyStored(aCodeId) {
    try {
      const sameCodeId = (product) => product.code === aCodeId;
      if (await this.getProducts().some(sameCodeId))
        throw new Error(`Ya existe un producto con el código ${aCodeId}`);
    } catch (error) {
      throw error;
    }
  }

  async nextSequentialNumber() {
    try {
      const currentLenght = (await this.getProducts()).length;
      return currentLenght + 1;
    } catch (error) {}
  }

  async initializeProductUsing({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) {
    try {
      const id = await this.nextSequentialNumber();
      return new Product({
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    } catch (error) {}
  }

  async addProduct(aPotentialProduct) {
    try {
      this.assertSatisfiesAllRequiredParameters(aPotentialProduct);
      await this.assertCodeIsNotAlreadyStored(aPotentialProduct.code);

      const product = await this.initializeProductUsing(aPotentialProduct);

      let products = await this.getProducts();

      products.push(product);

      await fs.writeFile(this.path, JSON.stringify(products), "utf-8");
    } catch (error) {
      console.error(error.message);
    }
  }

  async getProducts() {
    try {
      return await this.readFileProducts();
    } catch (error) {}
  }

  async readFileProducts() {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      const productsJs = await JSON.parse(productsData);
      return productsJs;
    } catch (error) {
      return [];
    }
  }

  async assertHasProducts() {
    try {
      const products = await this.getProducts();
      console.log(products.length);
      if (!products.length) throw new Error("No hay productos");
    } catch (error) {
      throw error;
    }
  }

  async getFilteredBy(aCriteria) {
    try {
      const products = await this.getProducts();
      return products.find(aCriteria);
    } catch (error) {}
  }

  async getProductById(anId) {
    try {
      await this.assertHasProducts();
      const product = await this.getFilteredBy(
        (product) => product.id === anId
      );
      if (!product)
        throw new Error(`No se encuentra el producto con ID ${anId}`);
      return product;
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteProduct(anId) {
    try {
      const productToDelete = await this.getProductById(anId);

      let currentProducts = await this.getProducts();

      currentProducts = currentProducts.filter(
        (product) => product !== productToDelete
      );

      await fs.writeFile(this.path, JSON.stringify(currentProducts), "utf-8");
    } catch (error) {}
  }

  async updateProduct(anOriginalProductId, anUpdatedProduct) {
    try {
      const productToUpdate = await this.getProductById(anOriginalProductId);
      let products = await this.getProducts();
      anUpdatedProduct.id = anOriginalProductId;
      const index = products.indexOf(productToUpdate);
      if (~index) {
        products[index] = anUpdatedProduct;
      }
      await fs.writeFile(this.path, JSON.stringify(products), "utf-8");
    } catch (error) {}
  }
}
