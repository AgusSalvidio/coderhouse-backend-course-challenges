const socket = io();

const registerNewProduct = () => {
  Swal.fire({
    title: "Agregar Producto",
    html: `
    <div class="modal-body">
      <div class="container-fluid">
        <div class="row text-left">
          <div class="col-md-6">
            <label for="title" class="col-form-label">Título</label>
            <input id="title" type="text" name="title" class="form-control" placeholder="Título"> 
          </div>
          <div class="col-md-6">
            <label for="description" class="col-form-label">Descripción</label>
            <input id="description" type="text" name="description" class="form-control" placeholder="Descripción">
          </div>
          <div class="col-md-6">
            <label for="price" class="col-form-label">Precio</label>
            <input id="price" type="text" name="price" class="form-control" placeholder="Precio">
          </div>
          <div class="col-md-6">
            <label for="stock" class="col-form-label">Stock</label>
            <input id="stock" type="text" name="stock" class="form-control" placeholder="Stock">
          </div>
          <div class="col-md-6">
            <label for="code" class="col-form-label">Código:/label>
            <input id="code" type="text" name="code" class="form-control" placeholder="Código">
          </div>
          <div class="col-md-6">
            <label for="thumbnail" class="col-form-label">Imagen</label>
            <input id="thumbnail" type="file" class="form-control" placeholder="Seleccione imagen">
          </div>
        </div>   
      </div>
    </div>
    `,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Agregar",
    confirmButtonColor: "#b61212",
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      const stock = document.getElementById("stock").value;
      const code = document.getElementById("code").value;
      const thumbnail = document.getElementById("thumbnail").files[0];

      console.log("Título:", title);
      console.log("Descripción:", description);
      console.log("Precio:", price);
      console.log("Stock:", stock);
      console.log("Código:", code);
      console.log("Imagen:", thumbnail);

      //Hacer magia para guardar la info
    },
  });
};

const deleteProduct = (aProductJSON) => {
  const product = JSON.parse(aProductJSON);
  Swal.fire({
    title: `¿Seguro que desea eliminar ${product.title}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#b61212",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  })
    .then((result) => {
      if (result.isConfirmed) {
        socket.emit("deleteProductEvent", product);
        refreshProductsTable();
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const refreshProductsTable = async (products) => {
  let productsTableBody = document.getElementById("products_tbody");
  let content = ``;
  if (products == []) {
    content += `  <tr>
      <td colspan="7">No hay productos</td>
      </tr>`;
  } else {
    products.forEach((product) => {
      content += `
        <tr>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.code}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td class="px-4">
        <a
        onclick="showImageIdentifiedBy('${product.thumbnail}')"
              class="btn-sm clickable"
              ><i class="fa-regular fa-image"></i></a>
              </td>
              <td class="px-4">
              <a
              onclick="deleteProduct('${JSON.stringify(product)}')"
              class="btn-sm clickable"
            ><i class="fa-solid fa-xmark" style="color:#b61212"></i></a>
          </td>
        </tr>
              `;
    });
  }
  productsTableBody.innerHTML = content;
};

socket.on("updateProductTableEvent", async (products) => {
  refreshProductsTable(products);
});
