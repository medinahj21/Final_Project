import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD:client/src/pages/Shop/ShowProducts.jsx
import { setPageNumPrev } from "../../redux/actions/products";
=======

import { setPageNumPrev } from "../../../redux/actions/products";

import ProductCard from "./ProductCard";
import Paginated from "../Paginated";

>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd:client/src/components/Shop/ProductCard/ShowProducts.jsx
import "./ShowProducts.css";

import ProductCard from "../../components/ProductCard/ProductCard";
import Paginated from "./Paginated";
import { clearCart } from "../../redux/actions/shoppingCart";

export default function ShowProducts({ dataFiltered }) {
  const dispatch = useDispatch();

  const prevPage = useSelector((state) => {
    return state.productsReducer.prevPage;
  });

  //paginated
  const [currentPage, setCurrentPage] = useState(prevPage);
  const productPerPage = 4;
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = dataFiltered.slice(
    firstProductIndex,
    lastProductIndex
  );

  useEffect(() => {
    if (prevPage !== currentPage) {
      setCurrentPage(prevPage);
    }
  }, [currentPage, prevPage]);

  const paginatedHandler = (pageNum) => {
    setCurrentPage(pageNum);
    dispatch(setPageNumPrev(pageNum));
  };

  return (
    <div>
      <Paginated
        productPerPage={productPerPage}
        allProducts={dataFiltered}
        paginatedHandler={paginatedHandler}
      />
      <div className="card__container">
        {currentProduct?.map((p) => {
          return (
            <ProductCard
              key={p.id}
              id={p.id}
              image={p.image}
              name={p.name}
              price={p.price}
            />
          );
        })}
      </div>
    </div>
  );
}
