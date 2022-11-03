import React, { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";

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
    <form onSubmit={submitHandler} className="forgot-password">
      <h4>Recuperar contraseña</h4>
      <div className="form-group">
        <input
          value={email}
          type="email"
          name="email"
          className="form-style"
          placeholder="Your Email"
          onChange={changeHandler}
        />
      </div>
      <div className="forgot-container-btn">
        <button type="submit" className="btn">
          Enviar
        </button>
        <button type="button" onClick={backLogInHandle} className="btn">
          Volver
        </button>
      </div>
    </form>
  );
}

export default ForgotPassword;
