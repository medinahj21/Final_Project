import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { validateClick } from "../../../utils/validateClick";
import { ResetPassword } from "../../../utils/ResetPassword";

import { CgProfile } from "react-icons/cg";
import { RiAdminLine, RiDeviceRecoverLine } from "react-icons/ri";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShopping,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { SlHome } from "react-icons/sl";

import { logout } from "../../../redux/actions/auth";
import { clearCart } from "../../../redux/actions/shoppingCart";
import {
  clearPlayerDetail,
  updatePlayerCart,
} from "../../../redux/actions/player";

import "./NavbarDash.css";

function NavbarDash({ setClickChoice }) {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const email = useSelector((state) => state.authReducer.email);
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
                          <i className="ion-ios-information-outline"></i>
                          Pagos y deudas
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          onClick={(e) => onClcikHandler(e, "pagosHistory")}
                        >
                          <i className="ion-android-star-outline"></i>Historial
                          de pagos
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
                    {userInfoFirestore.superAdmin && (
                      <a
                        href="#!"
                        onClick={() => validateClick("socios", setClickChoice)}
                      >
                        <i className="ion-ios-paperplane-outline"></i>Gestion de
                        admins
                      </a>
                    </li>}
                    <li>
                      <a
                        href="#!"
                        onClick={() => validateClick("player", setClickChoice)}
                      >
                        <i className="ion-ios-paperplane-outline"></i>Gestion de
                        jugadores
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="ion-ios-information-outline"></i>
                        Pagos y deudas
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="ion-ios-information-outline"></i>
                        Compras y pedidos
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {isPlayer.id ? (
                <li>
                  <Link to={"/products"}>
                    <i className="shop-icon">
                      <AiOutlineShopping />
                    </i>{" "}
                    <span>Tienda</span>
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
                    <span>Tienda</span>
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
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <a href="#!" onClick={() => ResetPassword(email)}>
                  <i className="reset-icon">
                    <RiDeviceRecoverLine />
                  </i>{" "}
                  <span>Cambiar contraseña</span>
                </a>
              </li>
              <li>
                <a href="#!" onClick={handleLogout}>
                  <i className="logout-icon">
                    <BiLogOut />
                  </i>{" "}
                  <span>Cerrar sesión</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </section>
    </>
  );
}

export default NavbarDash;
