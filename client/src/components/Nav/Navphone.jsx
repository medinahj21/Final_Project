import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Navphone.css";
import { logout } from "../../redux/actions/auth";
import { validateClick } from "../../utils/validateClick";

function Navphone({
  setClickChoice,
  isDashboard,
  setShowRegister,
  setShowLogin,
  setShowAlta,
}) {
  const dispatch = useDispatch();

  const { email, userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

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
              <p onClick={handleRegister}>Registrarse</p>
              <p onClick={handleLogin}>Iniciar Sesión</p>
            </div>
          ) : (
            <div>
              <p onClick={handleLogout}>Cerrar Sesión</p>
            </div>
          )}

          {isDashboard ? (
            <>
              <p onClick={() => validateClick("perfil", setClickChoice)}>
                <li>Perfil</li>
              </p>
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("pagos", setClickChoice)}>
                  <li>Administracion de pagos</li>
                </p>
              )}
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("request", setClickChoice)}>
                  <li>Solicitudes</li>
                </p>
              )}
              {!userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("grupo", setClickChoice)}>
                  <li>Mi grupo</li>
                </p>
              )}
              {!userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("pagos", setClickChoice)}>
                  <li>Pagos</li>
                </p>
              )}
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("socios", setClickChoice)}>
                  <li>Socios</li>
                </p>
              )}
              <p onClick={() => validateClick("calendario", setClickChoice)}>
                <li>Calendario</li>
              </p>
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("grupos", setClickChoice)}>
                  <li>Grupos</li>
                </p>
              )}
              <Link to={"/"}>
                <li>Inicio</li>
              </Link>
              <Link to={"/products"}>
                <li>Tienda</li>
              </Link>
            </>
          ) : (
            <>
              {!userInfoFirestore || userInfoFirestore.name === "" ? (
                <>
                  {email ? (
                    <p onClick={() => setShowAlta(true)}>Alta jugador |</p>
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
                  Dashboard |
                </Link>
              )}
              <p href="!">
                <li>Oferta</li>
              </p>
              <p href="!">
                <li>calendario</li>
              </p>
              <p href="!">
                <li>Nosotros</li>
              </p>
              <p href="!">
                <li>Contacto</li>
              </p>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navphone;
