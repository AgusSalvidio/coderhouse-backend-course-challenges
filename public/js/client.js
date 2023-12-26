const socket = io();

const registerNewProduct = () => {
  Swal.fire({
    imageUrl: anImageUrl,
    imageWidth: 600,
    imageHeight: 300,
    imageAlt: "A product image",
    showConfirmButton: false,
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
