import React from "react";

function ProductProperties({ newProduct, handleSetNewProductProperties }) {
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
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        ></input>
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
