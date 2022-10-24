//import React, { useEffect } from "react";
import { useSelector } from "react-redux";
//import { updatePlayerCart } from "../../redux/actions/player";
import CartProduct from "./CartProduct"
import Modal from "../UI/Modal";
import "./ShoppingCart.css"

const ShoppingCart = ({setShowCart}) => {
  
const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

//Este useEffect me rompe la consola del navegador al renderizar "/cart" ??????????????
/*   useEffect(() => {
    dispatch(updatePlayerCart(playerShopCart.uid, productsInCart));
  }, [dispatch, productsInCart]); */

  return (
    <Modal>
    <div>
      <button onClick={()=> setShowCart(false)}>X</button>
      <h2>Carrito de Compras</h2>
      {productsInCart?.filter((item)=> item.quant !== 0).map((prod, index) => {
        return (
          <CartProduct
            key= {index}
            prod= {prod}
          />
        );
      })}
      <div>
        <h2>Total</h2>
        <h2>
          ${" "}
          {productsInCart?.reduce(
            (a, item) => a + item.product.price * item.quant,
            0
          )}
          .00
        </h2>
      </div>
      <button className="card__title card__title-checkout">Proceder al pago</button>
    </div>
    </Modal>
  );
};

export default ShoppingCart;
