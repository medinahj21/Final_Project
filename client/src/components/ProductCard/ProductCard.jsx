import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  return (
    <div>
      <div>
        <Link to={`/products/${id}`}>
          <h3>{name}</h3>
          <img src={image} alt="Img not found" height={300} />
        </Link>
      </div>
      <div>
        <p>$ {price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
