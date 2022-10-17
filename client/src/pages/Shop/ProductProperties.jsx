import React from "react";

function ProductProperties({
  newProduct,
  handleSetNewProductProperties,
  setNewProduct,
}) {
  const handleOnClick = (e) => {
    //Aqui hago el llamado al widget de la cloudinary y que suba la imagen
    const widger_cloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmcrq99gc", //El nombre de mi cuenta en cloudinary
        uploadPreset: "prueba", //Nombre de la "nube"
      },
      (err, result) => {
        if (result.event === "success") {
          setNewProduct({
            //Guardo en el valor en el input correspondiente
            ...newProduct,
            image: result.info.url,
          });
        } else if (err) {
          console.log(err);
        }
      }
    );

    widger_cloudinary.open(); //Para que se abra el widget
  };

  return (
    <>
      <div>
        <label> Nombre producto: </label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        ></input>
      </div>
      <hr />
      <div>
        <label> Imagen: </label>
        <div onClick={handleOnClick}>Cargar image</div>
      </div>
      <hr />
      <div>
        <label> Precio: </label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        ></input>
      </div>
      <hr />
      <div>
        <label> Descripción: </label>
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        ></input>
      </div>
    </>
  );
}

export default ProductProperties;
