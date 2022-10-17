import React from "react";

function Button(onClickHandler) {
  const { hanlder, value } = onClickHandler;
  return (
    <button
      onClick={(e) => {
        hanlder(e, value);
      }}
    >
      CREAR PRODUCTO
    </button>
  );
}

export default Button;
