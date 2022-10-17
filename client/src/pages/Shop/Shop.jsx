import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanProductDetail,
  cleanProducts,
  getFilterTags,
  getProducts,
} from "../../redux/actions/products";

import "../Shop/Shop.css";
import CreateProduct from "./CreateProduct";
import {handleFilter} from "./utils/filters";
import ShowProducts from "./ShowProducts";
import SearchbarProduct from "./SearchbarProduct";

function Shop() {
  const [creationDiv, setCreationDiv] = useState(false);
  const [tags, setTags] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getTags() {
      await dispatch(getFilterTags());
      await dispatch(cleanProductDetail());
    }
    getTags();
  }, [dispatch]);

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const allTags = useSelector((state) => state.productsReducer.filterTags);

  useEffect(() => {
    if (allProducts) {
      setDataFiltered(allProducts);
      return;
    }
    dispatch(getProducts());
  }, [dispatch, allProducts]);

  const handleAllProducts = (e) => {
    dispatch(getProducts());
    setDataFiltered(allProducts);
  };

  const handleClean = () => {
    dispatch(cleanProducts());
    setDataFiltered([]);
    setTags([]);
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

  return (
    <div className="shop__container">
      <SearchbarProduct
        handleAllProducts={handleAllProducts}
        setCreationDiv={setCreationDiv}
        handleTags={handleTags}
        allTags={allTags}
        tags={tags}
        deleteTag={deleteTag}
        handleClean={handleClean}
      />
      {creationDiv ? (
        <div>
          <h1>Crear producto</h1>
          <CreateProduct isCreate={true}/>
          <button
            onClick={() => {
              setCreationDiv(false);
            }}
          >
            Cerrar
          </button>
        </div>
      ) : (
        <></>
      )}
      <ShowProducts dataFiltered={dataFiltered} />
    </div>
  );
}

export default Shop;
