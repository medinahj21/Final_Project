import React from "react";
import { ResetPassword } from "../../../utils/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { Link } from "react-router-dom";
import { validateClick } from "../../../utils/validateClick";

import { CgProfile } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { SlHome } from "react-icons/sl";

import "./NavbarDash.css";

function NavbarDash({ setClickChoice, clickChoice }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authReducer.email);
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(logout());
  };

  const onClcikHandler = (e, value) => {
    e.preventDefault();
    validateClick(value, setClickChoice);
  };

  return (
    <section className="app">
      <aside className="sidebar">
        <header>Menu</header>
        <div className="sidebar-image">
          <span>IMAGE</span>
        </div>
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
                {!userInfoFirestore.isAdmin && (
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
                        <i className="ion-android-star-outline"></i>Mis compras
                      </a>
                    </li>
                  </>
                )}
                <li>
                  <a href="#!" onClick={(e) => onClcikHandler(e, "grupo")}>
                    <i className="ion-ios-paperplane-outline"></i>Grupo
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
                    <a href="#!" onClick={(e) => onClcikHandler(e, "request")}>
                      <i className="ion-ios-filing-outline"></i>Inscripciones
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="ion-ios-information-outline"></i>Contaduria
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={() => validateClick("socios", setClickChoice)}
                    >
                      <i className="ion-ios-paperplane-outline"></i>Socios
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
                    onClick={() => validateClick("calendario", setClickChoice)}
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
                    <i className="ion-ios-location-outline"></i>Toreno
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i className="ion-ios-locked-outline"></i>Eventos especiales
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/products"}>
                <i className="shop-icon">
                  <AiOutlineShopping />
                </i>{" "}
                <span className="">Tienda</span>
              </Link>
            </li>
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
  );
}

export default NavbarDash;
