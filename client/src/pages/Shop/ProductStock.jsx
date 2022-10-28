import React from "react";

function ProductStock({ onHandler, isOrder, newProduct, onHandlerNewProd }) {
  return (
    <>
      <div className="select_container">
        <select
          defaultValue="type"
          className="select_content"
          name="Tags"
          onChange={onHandler}
        >
          <option value="type" disabled={true}>
            {"Pedido o Stock"}
          </option>
          <option value={true}>{"Bajo pedido"}</option>
          <option value={false}>{"Bajo stock"}</option>
        </select>
      </div>

      {isOrder === "false" ? (
        <div className="forms_field">
          <input
            type="number"
            name="stock"
            placeholder="Existencias"
            className="forms_field-input"
            onChange={(e) => {
              onHandlerNewProd(e);
            }}
          />
        </div>
      ) : (
        <>{isOrder === "true" ? <p>Bajo pedido</p> : <></>}</>
      )}
    </>
  );
}

export default ProductStock;
