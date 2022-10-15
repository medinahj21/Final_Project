import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, name, price, image }) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-image">
          <Link className="Link" to={`/products/${id}`}>
            <img className="pic" src={image} alt="Img not found" />
          </Link>
        </div>
        <div className="card-info">
          <h3>{name}</h3>
          <p>$ {price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
