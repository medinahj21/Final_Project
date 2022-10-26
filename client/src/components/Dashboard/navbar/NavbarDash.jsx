import React, { useState } from "react";
import { ResetPassword } from "../../../utils/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { Link } from "react-router-dom";
import { validateClick } from "../../../utils/validateClick";

import { CgProfile } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShopping,
} from "react-icons/ai";
import { SlHome } from "react-icons/sl";

import "./NavbarDash.css";
import { clearCart } from "../../../redux/actions/shoppingCart";
import {
  clearPlayerDetail,
  updatePlayerCart,
} from "../../../redux/actions/player";

function NavbarDash({ setClickChoice }) {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const email = useSelector((state) => state.authReducer.email);
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const isPlayer = useSelector((state) => state.playerReducer.playerDetail);
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  const handleLogout = () => {
    dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart));
    dispatch(clearPlayerDetail());
    dispatch(clearCart());
    dispatch(logout());
  };

  const onClcikHandler = (e, value) => {
    e.preventDefault();
    validateClick(value, setClickChoice);
  };

  return (
    <>
      <span onClick={() => setShowMenu(!showMenu)} className="showAction">
        {showMenu ? (
          <div className="menu-icon">
            <AiOutlineClose />
          </div>
        ) : (
          <div className="menu-icon">
            <AiOutlineMenu />
          </div>
        )}
      </span>
      <section className={!showMenu ? "app" : "show-navbar"}>
        <aside className="sidebar">
          <header className="header-sidebar">Menu</header>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <a href="#!">
                  <i className="ion-ios-paper-outline">
                    <CgProfile />
                  </i>{" "}
                  <span className="">Perfil</span>
                </a>
                <ul className="nav-flyout">
                  <li>
                    <a
                      href="info-personal"
                      onClick={(e) => onClcikHandler(e, "perfil")}
                    >
                      <i className="ion-ios-filing-outline"></i>Info personal
                    </a>
                  </li>
                  {!userInfoFirestore.isAdmin && isPlayer.id ? (
                    <>
                      <li>
                        <a
                          href="pagos"
                          onClick={(e) => onClcikHandler(e, "pagos")}
                        >
                          <i className="ion-ios-information-outline"></i>Detalle
                          de pagos
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="ion-android-star-outline"></i>Mis
                          compras
                        </a>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <li>
                    <a href="#!" onClick={(e) => onClcikHandler(e, "grupo")}>
                      <i className="ion-ios-paperplane-outline"></i>
                      {isPlayer?.id ? "Mi grupo" : "Grupos"}
                    </a>
                  </li>

                  <li>
                    <a href="#!" onClick={() => ResetPassword(email)}>
                      <i className="ion-android-star-outline"></i>Cambiar
                      contraseña
                    </a>
                  </li>
                  <li>
                    <a href="#!" onClick={handleLogout}>
                      <i className="ion-android-star-outline"></i>Cerrar sesión
                    </a>
                  </li>
                </ul>
              </li>
              {userInfoFirestore.isAdmin && (
                <li>
                  <a href="#!">
                    <i className="admin-icon">
                      <RiAdminLine />
                    </i>{" "}
                    <span className="">Administracion</span>
                  </a>
                  <ul className="nav-flyout">
                    <li>
                      <a
                        href="#!"
                        onClick={(e) => onClcikHandler(e, "request")}
                      >
                        <i className="ion-ios-filing-outline"></i>Inscripciones
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="ion-ios-information-outline"></i>
                        Contaduria
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        onClick={() => validateClick("socios", setClickChoice)}
                      >
                        <i className="ion-ios-paperplane-outline"></i>Usuarios
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              <li>
                <a href="#!">
                  <i className="calendar-icon">
                    <BsCalendarEvent />
                  </i>{" "}
                  <span className="">Calendario</span>
                </a>
                <ul className="nav-flyout">
                  <li>
                    <a
                      href="#!"
                      onClick={() =>
                        validateClick("calendario", setClickChoice)
                      }
                    >
                      <i className="ion-ios-flame-outline"></i>Entrenamiento
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ion-ios-lightbulb-outline"></i>Partidos
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ion-ios-location-outline"></i>Torneo
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ion-ios-locked-outline"></i>Eventos
                      especiales
                    </a>
                  </li>
                </ul>
              </li>
              {isPlayer.id ? (
                <li>
                  <Link to={"/products"}>
                    <i className="shop-icon">
                      <AiOutlineShopping />
                    </i>{" "}
                    <span className="">Tienda</span>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {userInfoFirestore.isAdmin ? (
                <li>
                  <Link to={"/products"}>
                    <i className="shop-icon">
                      <AiOutlineShopping />
                    </i>{" "}
                    <span className="">Tienda</span>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li>
                <Link to={"/"}>
                  <i className="home-icon">
                    <SlHome />
                  </i>{" "}
                  <span className="">Inicio</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </section>
    </>
  );
}

export default NavbarDash;
