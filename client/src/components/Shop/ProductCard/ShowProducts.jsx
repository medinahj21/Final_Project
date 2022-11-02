import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts, setPageNumPrev } from "../../../redux/actions/products";

import ProductCard from "./ProductCard";
import Paginated from "../Paginated";

import "./ShowProducts.css";


export default function ShowProducts({ combinedFilter }) {
  const dispatch = useDispatch();

  const prevPage = useSelector((state) => {
    return state.productsReducer.prevPage;
  });

  //paginated
  const [currentPage, setCurrentPage] = useState(prevPage);
  const productPerPage = 4;
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;


  const currentProduct = combinedFilter.slice(
    firstProductIndex,
    lastProductIndex
  );

  useEffect(() => {
    //console.log("Me acabo de renderizar");
    dispatch(getProducts());
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
        allProducts={combinedFilter}
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
