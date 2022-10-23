import React, { useState } from "react";

import { toast } from "react-toastify";

import LoginGoogle from "./LoginGoogle";
import { registerWhitEmailAndPassword } from "../../redux/actions/auth";

function Register({ setShowRegister, setShowLogin, setShowAlta }) {
  const notifyError = (error) =>
    toast.error(error, {
      draggable: true,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  const notify = () =>
    toast.success("Registro exitoso, vamos a darnos de alta !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await registerWhitEmailAndPassword(
        credentials.email,
        credentials.password
      );
      // await sendVerificationEmail(auth.currentUser);
      notify();
      setTimeout(() => {
        setShowLogin(false);
        setShowRegister(false);
        setShowAlta(true);
      }, 2000);
      setCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
      return notifyError(error.message);
    }
  };

  return (
    <>
      <div className="user_forms-signup">
        <h2 className="forms_title">Registrarse</h2>
        <form className="forms_form" onSubmit={submitHandler}>
          <div className="forms_field">
            <input
              value={credentials.email}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="forms_field-input"
              onChange={changeHandler}
            />
          </div>
          <div className="forms_field">
            <input
              value={credentials.password}
              type="password"
              name="password"
              placeholder="Contraseña"
              className="forms_field-input"
              onChange={changeHandler}
            />
          </div>
          <div className="forms_buttons">
            <button type="submit" className="forms_buttons-action">
              Registrarse
            </button>
            <LoginGoogle />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
