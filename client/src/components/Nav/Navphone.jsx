import React, { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Navphone.css";
import { logout, getUserFirestore } from "../../redux/actions/auth";
import { validateClick } from "../../utils/validateClick";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

import { updatePlayerCart, getPlayerDetail} from "../../redux/actions/player";
import { clearCart, setInitialCart} from "../../redux/actions/shoppingCart";

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
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLogin = async() => {
    setShowRegister(false);
    setShowLogin(true);
    
  };

  const handleLogout = async() => {
    await dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart));
    await dispatch(clearCart());
    await dispatch(logout());
  };

   useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUserFirestore(currentUser.uid));
        dispatch(getPlayerDetail(currentUser.uid))
        .then(action =>{
          dispatch(setInitialCart(action.payload.shoppingCart))
        } )

        //console.log("response", response)
        //dispatch(setInitialCart(response.shoppingCart))
      }
    });
    return () => unSuscribe();
  }, [dispatch]);

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
              <Link to={"/products"}>
                <li>Tienda</li>
              </Link>
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("request", setClickChoice)}>
                  <li>Solicitudes</li>
                </p>
              )}
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("pagos", setClickChoice)}>
                  <li>Administracion de pagos</li>
                </p>
              )}
              {!userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("pagos", setClickChoice)}>
                  <li>Pagos</li>
                </p>
              )}
              <p onClick={() => validateClick("grupo", setClickChoice)}>
                <li>Grupos</li>
              </p>
              {userInfoFirestore.isAdmin && (
                <p onClick={() => validateClick("socios", setClickChoice)}>
                  <li>Socios</li>
                </p>
              )}
              <p onClick={() => validateClick("calendario", setClickChoice)}>
                <li>Calendario</li>
              </p>
              <Link to={"/"}>
                <li>Inicio</li>
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
