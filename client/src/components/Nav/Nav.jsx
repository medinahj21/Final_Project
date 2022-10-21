import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/actions/auth";

import LOGO from "../../images/LogoPNG.png";
import "./Nav.css";

function Nav({ setShowLogin, setShowRegister, setShowAlta }) {
  const dispatch = useDispatch();

  const { email, userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="nav__container">
      <Link to={"/"} className="nav__logo">
        <img src={LOGO} alt="logo" />
      </Link>
      <div className="nav__container-links">
        {email === "" || !email ? (
          <div className="nav__login">
            <button onClick={() => setShowRegister(true)}>Registrarse</button>
            <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
          </div>
        ) : (
          <div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}

        <div className="nav__links">
          {!userInfoFirestore || userInfoFirestore.name === "" ? (
            <>
              {email ? (
                <button onClick={() => setShowAlta(true)}>
                  Alta jugador |
                </button>
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

          <a href="oferta">Oferta</a>
          <a href="calendario">Calendario</a>
          <a href="Nosotros">Nosotros</a>
          <a href="contanto">Contacto</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
