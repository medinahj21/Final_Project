import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayerCart, getPlayerDetail } from "../../redux/actions/player";
import { clearCart, setInitialCart} from "../../redux/actions/shoppingCart";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

import { logout,getUserFirestore } from "../../redux/actions/auth";

import LOGO from "../../images/LogoPNG.png";
import "./Nav.css";
import {AiOutlineShoppingCart} from "react-icons/ai"

function Nav({ setShowLogin, setShowRegister, setShowAlta }) {
  const dispatch = useDispatch();

  const { email, userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  const handleLogout = async () => {
    await dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart));
    await dispatch(clearCart());
    await dispatch(logout());
  };

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUserFirestore(currentUser.uid));
        dispatch(getPlayerDetail(currentUser.uid))
      }
    });
    return () => unSuscribe();
  }, [dispatch]);

  return (
    <nav className="nav__container">
      <Link to={"/"} className="nav__logo">
        <img src={LOGO} alt="logo" />
      </Link>
      <div className="nav__container-links">
        {email === "" || !email ? (
          <div className="nav__login">
            <p onClick={() => setShowRegister(true)}>Registrarse</p>
            <p onClick={() => setShowLogin(true)}>Iniciar Sesión</p>
          </div>
        ) : (
          <div className="nav__login">
            <p onClick={handleLogout}>Cerrar Sesión</p>
            {
                productsInCart?.length>0?
                <div className="nav_cart">
                  <AiOutlineShoppingCart />
                </div>
                :
                <></>
              }
          </div>
        )}

        <div className="nav__links">
          {!userInfoFirestore || userInfoFirestore.name === "" ? (
            <>
              {email ? (
                <p onClick={() => setShowAlta(true)}>Alta jugador |</p>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>              
              <Link
                to={
                  userInfoFirestore.isAdmin
                    ? "/dashboard-admin"
                    : "/dashboard-player"
                }
              >
                Dashboard |
              </Link>            
            </>
            
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
