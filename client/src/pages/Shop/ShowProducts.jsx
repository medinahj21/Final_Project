import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard/ProductCard";

export default function ShowProducts({dataFiltered}) {
console.log(dataFiltered);
  return (
    <div className="grid-container">
      {dataFiltered?.map((p) => {
        return (
          <div className="card-container" key={p.id}>
            <ProductCard
              id={p.id}
              image={p.image}
              name={p.name}
              price={p.price}
            />
          </div>
        );
      })}
    </div>
  );
}
