import React from "react";

import "./CardGroup.css";

export default function CardGroup({
  name,
  schedule,
  id,
  price,
  img,
  genre,
  idRecoverHandler,
}) {
  const handleClick = (id) => {
    idRecoverHandler(id);
  };

  return (
    <div className="flip-box" onClick={() => handleClick(id)}>
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <img className="groups__image-card" src={img} alt={name} />
        </div>
        <div className="flip-box-back">
          <h3 className="groups__card-title">{name}</h3>
          <p className="groups__card-span">
            <span>{genre}</span>
            <span>{schedule}</span>
            <span>Cuota: ${price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
