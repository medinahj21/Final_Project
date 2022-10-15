import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { cleanProducts, getProducts } from "../../redux/actions/products";

import "../Shop/Shop.css";

function Shop() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsReducer.allProducts);

  const handleAllProducts = (e) => {
    e.preventDefault(e);
    dispatch(getProducts());
  };

  const handleClean = () => {
    dispatch(cleanProducts());
  };

  return (
    <div>
      <button className="show-products" onClick={(e) => handleAllProducts(e)}>
        VIEW PRODUCTS
      </button>
      <div className="grid-container">
        {allProducts?.map((p) => {
          return (
            <div key={p.id}>
              <ProductCard
                id={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
              />
              <span>{p.image}</span>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={(e) => handleClean(e)}>LIMPIAR</button>
      </div>
    </div>
  );
}

export default Shop;
