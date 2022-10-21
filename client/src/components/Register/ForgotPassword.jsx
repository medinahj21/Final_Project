import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ setForgotPassword }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const backLogInHandle = (e) => {
    e.preventDefault();
    setForgotPassword(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length < 1) {
      alert("Debe ingresar un email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("email enviado para restaurar contraseña");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="register__form">
      <h3>Recuperar contraseña</h3>
      <label htmlFor="email">
        Email:{" "}
        <input
          type="email"
          name="email"
          value={email}
          id="email"
          placeholder="youremail@company.dtl"
          onChange={changeHandler}
        />
      </label>
      <button type="submit">Enviar</button>
      <button type="button" onClick={backLogInHandle}>
        Volver
      </button>
    </form>
  );
}

export default ForgotPassword;
