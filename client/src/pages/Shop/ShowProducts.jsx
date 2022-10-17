import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumPrev } from "../../redux/actions/products";
import "./ShowProducts.css";

import ProductCard from "../../components/ProductCard/ProductCard";
import Paginated from "./Paginated";

export default function ShowProducts({ dataFiltered }) {
  const dispatch = useDispatch();

  const prevPage = useSelector((state) => {
    return state.productsReducer.prevPage;
  });

  //paginated
  const [currentPage, setCurrentPage] = useState(prevPage);
  const recipePerPeage = 3;
  const lastRecipeIndex = currentPage * recipePerPeage;
  const fisrtRecipeIndex = lastRecipeIndex - recipePerPeage;
  const currentRecipe = dataFiltered.slice(fisrtRecipeIndex, lastRecipeIndex);

  useEffect(() => {
    if (prevPage !== currentPage) {
      setCurrentPage(prevPage);
    }
  }, [currentPage, prevPage]);
  console.log(currentPage);

  const paginatedHandler = (pageNum) => {
    setCurrentPage(pageNum);
    dispatch(setPageNumPrev(pageNum));
  };

  return (
    <div className="showproduct__container">
      <Paginated
        recipesPerPage={recipePerPeage}
        allRecipes={dataFiltered}
        paginatedHandler={paginatedHandler}
      />
      <div className="card__container">
        {currentRecipe?.map((p) => {
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
