import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Modal from "../UI/Modal";

import "./ProductCard.css";

function ProductCard({ id, name, price, image }) {

  /* const dispatch = useDispatch();
  
  const allProducts = useSelector((state) => {
    return state.productsReducer.allProducts;
  });
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
 */
  const [showDetail,setShowDetail] = useState(false);
  

  /* const handleAddToCart = ()=>{
    let itemToAdd = allProducts.find((product) => product.id === id);
    let productToAdd = productsInCart?.find((prod) => prod.product.id === id);

    if (productToAdd) {
      dispatch(incrementProductInCart(id));
    } else {
      dispatch(addToCart(itemToAdd));
    }
  } */
  
  return (
    <>
      <div className="card__content card__hover-effect">

        <h3 className="card__title">{name}</h3>
        <span className="card__price">price: ${price}</span>
        <img className="card__image-product" src={image} alt={name} />  
        <button className="card__title card__title-product" onClick={()=>setShowDetail(true)}>Ver más</button>
        
        <Link to={`/detail/${id}`}>
        </Link>
        {/* <button className="card__title card__title-recipe" onClick={()=> handleAddToCart(id)}>Agregar al carrito</button> */}
      </div>
      { showDetail?
      <Modal>
        <ProductDetail id={id} setShowDetail={setShowDetail}/>
      </Modal>
      :<></>}
    </>
  );
}

export default ProductCard;
