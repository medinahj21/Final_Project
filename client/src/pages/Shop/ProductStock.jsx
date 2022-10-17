import React from "react";

function ProductStock({ onHandler, isOrder, newProduct, onHandlerNewProd }) {
  return (
    <div>
      <label> Producto bajo pedido o bajo stock </label>
      <select value={-1} onChange={onHandler}>
        <option value={-1} disabled={true}>
          {"tipo de producto"}
        </option>
        <option value={true}>{"bajo pedido"}</option>
        <option value={false}>{"bajo stock"}</option>
      </select>
      <div>
        {isOrder === "false" ? (
          <div>
            <label>Existencias</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={(e) => {
                onHandlerNewProd(e);
              }}
            ></input>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default ProductStock;
