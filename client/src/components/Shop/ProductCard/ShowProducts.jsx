import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts, setPageNumPrev } from "../../../redux/actions/products";

import ProductCard from "./ProductCard";
import Paginated from "../Paginated";

import "./ShowProducts.css";

export default function ShowProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsReducer);

  const prevPage = useSelector((state) => {
    return state.productsReducer.prevPage;
  });

  //paginated
  const [currentPage, setCurrentPage] = useState(prevPage);
  const productPerPage = 4;
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = products?.slice(firstProductIndex, lastProductIndex);

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
        allProducts={products}
        paginatedHandler={paginatedHandler}
      />
      <div className="card__container">
        {currentProduct.length ? (
          currentProduct?.map((p) => {
            return (
              <ProductCard
                key={p.id}
                id={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                state={p.state}
              />
            );
          })
        ) : (
          <h3 className="product-not-found">Producto no encontrado</h3>
        )}
      </div>
    </div>
  );
}
