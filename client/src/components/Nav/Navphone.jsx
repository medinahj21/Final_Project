import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Navphone.css";
import { logout } from "../../redux/actions/auth";
import { validateClick } from "../../utils/validateClick";

function Navphone({ setClickChoice }) {
  const dispatch = useDispatch();

  const { email, userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          {email === "" || !email ? (
            <div className="nav__login">
              <Link to={"/check-in"}>Registrarse</Link>
              <Link to={"/login"}>Iniciar Sesión</Link>
            </div>
          ) : (
            <div>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          )}
          {!userInfoFirestore || userInfoFirestore.name === "" ? (
            <>
              {email ? (
                <Link to={"/form-user"}>
                  <li>Alta jugador</li>
                </Link>
              ) : (
                <></>
              )}
            </>
          ) : (
            <Link
              to={
                userInfoFirestore.isAdmin
                  ? "/dashboard-admin"
                  : "/dashboard-player"
              }
            >
              <li>Dashboard</li>
            </Link>
          )}
          <a onClick={() => validateClick("perfil", setClickChoice)}>
            <li> Perfil</li>
          </a>
          ;
          <a href="!">
            <li>Oferta</li>
          </a>
          <a href="!">
            <li>calendario</li>
          </a>
          <a href="!">
            <li>Nosotros</li>
          </a>
          <a href="!">
            <li>Contacto</li>
          </a>
        </ul>
      </div>
    </nav>
  );
}

export default Navphone;
