import React from "react";


import ProductCard from "../../components/ProductCard/ProductCard";

export default function ShowProducts({dataFiltered}) {
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
