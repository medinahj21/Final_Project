import React from "react";
import { ResetPassword } from "../../utils/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";


import "./UpdateCredentials.css";
import { updatePlayerCart } from "../../redux/actions/player";
import { clearCart } from "../../redux/actions/shoppingCart";

function UpdateCredentials() {
  const dispatch = useDispatch();
  const { email, userInfoFirestore } = useSelector((state) => state.authReducer);
  const productsInCart = useSelector((state)=> state.shoppingCartReducer.cart);



  const handleLogout = () => {
    dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart));
    dispatch(clearCart());
    dispatch(logout());
  };

  return (
    <div className="update_user-container">
      <button onClick={() => ResetPassword(email)}>Cambiar contraseña</button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default UpdateCredentials;
