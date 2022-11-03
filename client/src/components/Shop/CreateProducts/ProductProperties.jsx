import React from "react";

import FOTO from "../../../images/icono-marco-fotos-foto.webp";

function ProductProperties({
  newProduct,
  handleSetNewProductProperties,
  setNewProduct,
}) {
  const handleOnClick = (e) => {
    e.preventDefault();
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
      <div className="forms_field product__image-container">
        <button className="modify__button" onClick={handleOnClick}>
          Cargar imagen
        </button>
        <img
          className="product__image-create"
          src={newProduct.image || FOTO}
          alt="product"
        />
      </div>
      <div className="forms_field">
        <input
          value={newProduct.name}
          type="text"
          name="name"
          placeholder="Nombre"
          className="forms_field-input"
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        />
      </div>
      <div className="forms_field">
        <input
          type="number"
          name="price"
          placeholder="$ Precio"
          className="forms_field-input"
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        />
      </div>
      <div className="forms_field">
        <input
          value={newProduct.description}
          type="text"
          name="description"
          placeholder="Description"
          className="forms_field-input"
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        />
      </div>
    </>
  );
}

export default ProductProperties;
