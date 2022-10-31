import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Modal from "../UI/Modal";

import "./ProductCard.css";

function ProductCard({ id, name, price, image }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="card__content card__hover-effect">
        <h3 className="card__title">{name}</h3>
        <span className="card__price">price: ${price}</span>
        <img className="card__image-product" src={image} alt={name} />
        <button
          className="card__title card__title-product btn-product"
          onClick={() => setShowDetail(true)}
        >
          <span> Ver más</span>
        </button>

        <Link to={`/detail/${id}`}></Link>
      </div>
      {showDetail ? (
        <Modal clickHandler={() => setShowDetail(false)}>
          <ProductDetail id={id} setShowDetail={setShowDetail} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProductCard;
