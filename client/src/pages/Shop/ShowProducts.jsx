import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumPrev } from "../../redux/actions/products";
import "./ShowProducts.css";

import ProductCard from "../../components/ProductCard/ProductCard";
import Paginated from "./Paginated";
import { addToCart, clearCart, incrementProductInCart } from "../../redux/actions/shoppingCart";

export default function ShowProducts({ dataFiltered }) {
  const dispatch = useDispatch();

  const prevPage = useSelector((state) => {
    return state.productsReducer.prevPage;
  });

  const allProducts= useSelector((state)=> {
    return state.productsReducer.allProducts;
  })

  const productsInCart= useSelector((state)=> state.shoppingCartReducer.cart);

/*   const userCart= useSelector((state)=> {
    return state.shoppingReducer.cart;
  }) */



  //paginated
  const [currentPage, setCurrentPage] = useState(prevPage);
  const productPerPage = 3;
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

  const handleAddToCart= (id)=>{
    let itemToAdd= allProducts.find(product=> product.id === id);
    let productToAdd = productsInCart.find((prod) => prod.product.id === id); 
    if (productToAdd){
      dispatch(incrementProductInCart(id));
    }else{
      dispatch(addToCart(itemToAdd));
    }
    

  }

  const handleClearCart= ()=>{
    dispatch(clearCart())
  }

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
              handleAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
      <button onClick= {()=> handleClearCart()}>LIMPIAR CART</button>
    </div>
  );
}
