import { Link } from "react-router-dom";
import "./Nav.css";
import LOGO from "../../images/LogoPNG.png";
import { useAuth } from "../../context/authContext";

function Nav() {
  const { logout, user, userDB } = useAuth();

  return (
    <nav className="nav__container">
      <div className="nav__logo">
        <img src={LOGO} alt="logo" />
      </div>
      <div className="nav__container-links">
        {!user ? (
          <div className="nav__login">
            <Link to={"/check-in"}>Registrarse</Link>
            <Link to={"/login"}>Iniciar Sesión</Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                logout();
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
        <div className="nav__links">
          {user && userDB ? (
            <Link to={user.isAdmin ? "/dashboard-admin" : "/dashboard-player"}>
              Dashboard |
            </Link>
          ) : (
            <></>
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
