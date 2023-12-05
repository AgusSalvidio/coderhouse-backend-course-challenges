import { Product } from "../Product/Product.js";

export class ProductManagerMemoryBased {
  constructor() {
    this.products = [];
  }

  assertSatisfiesAllRequiredParameters = ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    /*This assertion should be made with a product already instanciated and by its class side assertion,
    but to comply with the exercise statement, is checked here, and also the manager has the responsability to
    instanciate the product. However, i would prefered that the manager received and already instanciated (and validated)
    Product object, and only check for the repeated code. -asalvidio*/

    if (!title || !description || !price || !thumbnail || !code || !stock)
      throw new Error("Faltan parámetros");
  };

  assertCodeIsNotAlreadyStored = (aCodeId) => {
    const sameCodeId = (product) => product.code === aCodeId;
    if (this.getProducts().some(sameCodeId))
      throw new Error(`Ya existe un producto con el código ${aCodeId}`);
  };

  nextSequentialNumber = () => this.getProducts().length + 1;

  initializeProductUsing = ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    const id = this.nextSequentialNumber();
    return new Product({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  };

  addProduct = (aPotentialProduct) => {
    try {
      this.assertSatisfiesAllRequiredParameters(aPotentialProduct);
      this.assertCodeIsNotAlreadyStored(aPotentialProduct.code);

      const product = this.initializeProductUsing(aPotentialProduct);

      this.products.push(product);
    } catch (error) {
      console.error(error.message);
    }
  };

  getProducts = () => this.products;

  assertHasProducts = () => {
    if (!this.getProducts().length) throw new Error("No hay productos");
  };

  getFilteredBy = (aCriteria) => this.products.find(aCriteria);

  getProductById = (anId) => {
    try {
      this.assertHasProducts();
      const product = this.getFilteredBy((product) => product.id === anId);
      if (!product)
        throw new Error(`No se encuentra el producto con ID ${anId}`);
      return product;
    } catch (error) {
      console.error(error.message);
    }
  };

  deleteProduct = (anId) => {
    const productToDelete = this.getProductById(anId);
    this.products = this.products.filter(
      (product) => product !== productToDelete
    );
  };

  updateProduct = (anOriginalProductId, anUpdatedProduct) => {
    const productToUpdate = this.getProductById(anOriginalProductId);
    anUpdatedProduct.id = anOriginalProductId;
    const index = this.products.indexOf(productToUpdate);
    if (~index) {
      this.products[index] = anUpdatedProduct;
    }
  };
}
