import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { incrementProductInCart, addToCart } from "../../redux/actions/shoppingCart";

import "./ProductCard.css";

function ProductCard({ id, name, price, image }) {

  const dispatch = useDispatch();
  
  const allProducts = useSelector((state) => {
    return state.productsReducer.allProducts;
  });
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  

  const handleAddToCart = ()=>{
    let itemToAdd = allProducts.find((product) => product.id === id);
    let productToAdd = productsInCart.find((prod) => prod.product.id === id);

    if (productToAdd) {
      dispatch(incrementProductInCart(id));
    } else {
      dispatch(addToCart(itemToAdd));
    }
  }
  
  return (
    <div className="card__content card__hover-effect">
      <Link to={`/products/${id}`}>
        <h3 className="card__title">{name}</h3>
      </Link>
      <span className="card__price">price: ${price}</span>
      <img className="card__image-product" src={image} alt={name} />
      <Link to={`/detail/${id}`}>
        <button className="card__title card__title-product">Detail</button>
      </Link>
      <button className="card__title card__title-recipe" onClick={()=> handleAddToCart(id)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
