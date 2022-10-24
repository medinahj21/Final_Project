import {AiOutlineShoppingCart} from "react-icons/ai"
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import FOTO from "../images/icono-marco-fotos-foto.webp";
import { validateClick } from "../utils/validateClick";
import "./DashNavbar.css";

function DashNabvar({ setClickChoice, clickChoice }) {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  return (
    <div className="dashboard__navbar">
      <button
        className={
          clickChoice.isPerfil
            ? "navbar__btn navbar__btn-clicked"
            : "navbar__btn"
        }
        onClick={() => validateClick("perfil", setClickChoice)}
      >
        Perfil
      </button>
      {userInfoFirestore.isAdmin && (
        <button
          className={
            clickChoice.isPagos
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => validateClick("pagos", setClickChoice)}
        >
          Administracion de pagos
        </button>
      )}
      <button
        className={
          clickChoice.isGrupo
            ? "navbar__btn navbar__btn-clicked"
            : "navbar__btn"
        }
        onClick={() => validateClick("grupo", setClickChoice)}
      >
        Grupos
      </button>
      {!userInfoFirestore.isAdmin && (
        <button
          className={
            clickChoice.isPagos
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => validateClick("pagos", setClickChoice)}
        >
          Pagos
        </button>
      )}
      {userInfoFirestore.isAdmin && (
        <button
          className={
            clickChoice.isSocios
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => validateClick("socios", setClickChoice)}
        >
          Socios
        </button>
      )}
      {userInfoFirestore.isAdmin && (
        <button
          className={
            clickChoice.isRequest
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => validateClick("request", setClickChoice)}
        >
          Inscripciones
        </button>
      )}
      <button
        className={
          clickChoice.isCalendario
            ? "navbar__btn navbar__btn-clicked"
            : "navbar__btn"
        }
        onClick={() => validateClick("calendario", setClickChoice)}
      >
        Calendario
      </button>
      <Link to={"/"}>
        <button className="navbar__btn">Inicio</button>
      </Link>
      <Link to={"/products"}>
        <button className="navbar__btn">
          Tienda
              {
                productsInCart?.length>0?
                <div className="nav_cart nav_cart_dash">
                  <AiOutlineShoppingCart />
                </div>
                :
                <></>
              }
        </button>
      </Link>
    </div>
  );
}

export default DashNabvar;
