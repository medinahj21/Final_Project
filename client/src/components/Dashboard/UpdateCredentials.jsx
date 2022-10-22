import React from "react";
import { ResetPassword } from "../../utils/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";

import "./UpdateCredentials.css";

function UpdateCredentials() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authReducer.email);

  const handleLogout = () => {
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
