const showImageIdentifiedBy = (anImageUrl) => {
  Swal.fire({
    imageUrl: anImageUrl,
    imageWidth: 600,
    imageHeight: 300,
    imageAlt: "A product image",
    showConfirmButton: false,
  });
};

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
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Borro producto");
    }
  });
};
