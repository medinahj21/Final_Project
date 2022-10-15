import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { cleanProducts, getProducts } from "../../redux/actions/products";

import "../Shop/Shop.css";
import CreateProduct from "./CreateProduct";

function Shop() {
  const [creationDiv, setCreationDiv] = useState(false);
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const allGenres = [
    { name: "hombre", id: 1 },
    { name: "mujer", id: 2 },
    { name: "unisex", id: 3 },
  ];

  const handleAllProducts = (e) => {
    e.preventDefault(e);
    dispatch(getProducts());
  };

  const handleClean = () => {
    dispatch(cleanProducts());
  };

  const handleFilterByGenre = (e) => {
    e.preventDefault(e);
    let genre = e.target.value;
    allProducts.filter((p) => p.filter_tags.includes(genre));
    return allProducts;
  };

  return (
    <div>
      <div>
        <button className="show-products" onClick={(e) => handleAllProducts(e)}>
          TODOS LOS PRODUCTOS
        </button>
        <div>
          <button
            onClick={(e) => {
              setCreationDiv(true);
            }}
          >
            CREAR PRODUCTO
          </button>
        </div>
        <div className="order-filter">
          <select defaultValue="title" onChange={(e) => handleFilterByGenre(e)}>
            <option value="title" disabled={true}>
              Filtar por: Genero
            </option>
            <option value="all">Todo</option>
            {allGenres.map((g) => {
              return (
                <option value={g.name} key={g.id}>
                  {g.name}
                </option>
              );
            })}
          </select>
          <select defaultValue="title2">
            <option value="title2" disabled={true}>
              Filtar por: Precio
            </option>
            <option>Mas económico</option>
            <option>Mas costoso</option>
          </select>
        </div>
        <div className="grid-container">
          {allProducts?.map((p) => {
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
      </div>
      <div>
        <button onClick={(e) => handleClean(e)}>LIMPIAR</button>
      </div>
      {creationDiv ? (
        <div>
          <h1>Crear producto</h1>
          <div>
            <CreateProduct/>
          </div>
          <button onClick={() => {setCreationDiv(false);}}>Cerrar</button>
        </div>
      ) : (
        <button
            onClick={(e) => {
              setCreationDiv(true);
            }}
          >
            CREAR PRODUCTO
          </button>
      )}

      <div></div>
    </div>
  );
}

export default Shop;
