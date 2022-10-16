import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  cleanProducts,
  getFilterTags,
  getProducts,
  modifyProducts,
} from "../../redux/actions/products";

import "../Shop/Shop.css";
import CreateProduct from "./CreateProduct";
import handleFilter from "./utils/filters";
import ShowProducts from "./ShowProducts";

function Shop() {
  const [creationDiv, setCreationDiv] = useState(false);
  const [tags, setTags] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  //setDataFiltered(handleFilter(allProducts, tags, allTags));

  const dispatch = useDispatch();

  useEffect(() => {
    async function getTags() {
      await dispatch(getFilterTags());
    }
    getTags();
  }, [dispatch]);

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const allTags = useSelector((state) => state.productsReducer.filterTags);

  const handleAllProducts = (e) => {
    e.preventDefault(e);
    dispatch(getProducts());
    setDataFiltered(allProducts);
  };

  const handleClean = () => {
    dispatch(cleanProducts());
  };

  const handleTags = (e) => {
    if (tags.indexOf(Number(e.target.value)) === -1)
      setTags([...tags, Number(e.target.value)]);

    let aux = handleFilter(
      allProducts,
      [...tags, Number(e.target.value)],
      allTags
    );
    setDataFiltered(aux);
  };

  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
    let aux2 = handleFilter(allProducts, aux, allTags);
    setDataFiltered(aux2);
  };

  /* const handleFilter = () => {    
    let dataFiltered = [...allProducts];
    tags.forEach((tag) => {
      dataFiltered = dataFiltered.filter((p) => {
        return p.filter_tags.includes(allTags.find((t) => t.id === tag).name);
      });
    });
    dispatch(modifyProducts(dataFiltered))
    
  }; */

  //let dataFil= allProducts.length > 0 && handleFilter(allProducts, tags, allTags)
  //console.log(handleFilter(allProducts, tags, allTags));

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
          <select defaultValue="title" onChange={(e) => handleTags(e)}>
            <option value="title" disabled={true}>
              Filtar por: Genero
            </option>
            {allTags?.map((tag) => {
              return (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
          {tags.length > 0 ? (
            <div>
              <ul>
                {tags?.map((tagId) => {
                  return (
                    <li key={tagId} value={tagId} onClick={(e) => deleteTag(e)}>
                      {allTags.find((t) => t.id === Number(tagId)).name} ❌
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p>No has seleccionado etiquetas</p>
          )}
          <select defaultValue="title2">
            <option value="title2" disabled={true}>
              Filtar por: Precio
            </option>
            <option>Mas económico</option>
            <option>Mas costoso</option>
          </select>
        </div>
        <div className="container">
          <ShowProducts dataFiltered={dataFiltered} />
        </div>
      </div>
      <div>
        <button onClick={(e) => handleClean(e)}>LIMPIAR</button>
      </div>
      {creationDiv ? (
        <div>
          <h1>Crear producto</h1>
          <div>
            <CreateProduct />
          </div>
          <button
            onClick={() => {
              setCreationDiv(false);
            }}
          >
            Cerrar
          </button>
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
