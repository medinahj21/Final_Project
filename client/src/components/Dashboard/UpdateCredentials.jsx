import React from "react";
import { ResetPassword } from "../../utils/ResetPassword";
import { useSelector } from "react-redux";

function UpdateCredentials() {
  const email = useSelector((state) => state.authReducer.email);

  return (
    <button onClick={() => ResetPassword(email)}>Cambiar contraseña</button>
  );
}

export default UpdateCredentials;
