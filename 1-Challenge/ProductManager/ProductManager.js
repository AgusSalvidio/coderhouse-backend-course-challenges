import { Product } from "../Product/Product";

export class ProductManager {
  constructor() {
    this.products = products;
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

  assertCodeIsNotAlreadyStored = (aCodeId) => {
    const productIndex = this.products.findIndex(
      (product) => product.code === aCodeId
    );

    if (productIndex !== -1)
      throw new Error(`Ya existe un producto con el código ${aCodeId}`);
  };

  nextSequentialNumber = () => this.products.lenght + 1;

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
    /*This assertion should be made with a product already instanciated and by its class side assertion,
    but to comply with the exercise statement, is checked here, and also the manager has the responsability to
    instanciate the product. However, i would prefered that the manager received and already instanciated (and validated)
    Product object, and only check for the repeated code. -asalvidio*/

    try {
      this.assertSatisfiesAllRequiredParameters(aPotentialProduct);
      this.assertCodeIsNotAlreadyStored(aPotentialProduct.code);

      const product = initializeProductUsing(aPotentialProduct);

      this.products(product);
    } catch (error) {
      console.error(error);
    }
  };

  getProducts = () => this.products;

  assertHasProducts = () => {
    if (this.products.length === 0) throw new Error("No hay productos");
  };

  getProductById = (anId) => {
    try {
      this.assertHasProducts;
      let product = products.find((product) => product.id === anId);
      if (!product)
        throw new Error(`No se encuentra el producto con ID ${anId}`);
      return product;
    } catch (error) {
      console.error(error);
    }
  };
}
