import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";

import CartProduct from "./CartProduct";

import { getPreference } from "../../../redux/actions/shoppingCart";

import "./ShoppingCart.css";

const ShoppingCart = ({ setShowCart }) => {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const { allProducts } = useSelector((state) => state.productsReducer);
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  const totalInCart = productsInCart?.map((item) => item.quant);
  const total = totalInCart?.length > 0 && totalInCart?.reduce((a, b) => a + b);
  const [checkOut, setCheckOut] = useState(false);

  const handleCheckoutTwo = async () => {
    setCheckOut(true);
    let idCart = [];

    productsInCart.map((pc) => {
      let filtered = allProducts.filter((ap) => ap.id === pc.product.id);
      let fillmap = filtered.map((e) => {
        return {
          id: e.id,
          title: e.name,
          description: e.description,
          picture_url: e.image,
          quantity: pc.quant,
          unit_price: e.price,
        };
      });
      idCart.push(fillmap);
    });
    const preference = await dispatch(getPreference(idCart.flat(), "shop"));
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preference.data.preferenceId);
    const button = document.getElementById("checkout");
    button.innerHTML = "";
    button.appendChild(script);
    setCheckOut(true);
  };

  return (
    <>
      <ToastContainer />
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <i className="fa fa-shopping-cart cart-icon"></i>
          <span className="badge">{total}</span>
          <div className="shopping-cart-total">
            <span className="lighter-text">Total: </span>
            <span className="main-color-text">
              $
              {productsInCart?.reduce(
                (a, item) => a + item.product.price * item.quant,
                0
              )}
            </span>
          </div>
        </div>
        {productsInCart?.length ? (
          <ul className="shopping-cart-items">
            {productsInCart?.map((prod, index) => {
              return (
                <CartProduct
                  key={index}
                  prod={prod}
                  productsInCart={productsInCart}
                  checkOut={checkOut}
                />
              );
            })}
          </ul>
        ) : (
          <h4 className="main-color-text">
            Aún no hay productos en el carrito
          </h4>
        )}

        {!userInfoFirestore.isAdmin && productsInCart.length > 0 && (
          <>
            <div id="checkout">
              <a href="#!" className="button" onClick={handleCheckoutTwo}>
                Confirmar compra
              </a>
            </div>
            {checkOut && (
              <div id="checkout">
                <a
                  href="#!"
                  className="button"
                  onClick={() => setShowCart(false)}
                >
                  Cancelar
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
