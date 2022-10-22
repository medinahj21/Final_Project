import React, { useState } from "react";

import { loginWhitEmailAndPassword } from "../../redux/actions/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginGoogle from "./LoginGoogle";
import ForgotPassword from "./ForgotPassword";

import "./Register.css";
import Modal from "../UI/Modal";

function Login({ setShowLogin }) {
  const notifyError = (error) =>
    toast.error(error, {
      draggable: true,
      hideProgressBar: true,
      theme: "colored",
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const notify = () =>
    toast.success("Bienvenid@", { position: toast.POSITION.BOTTOM_RIGHT });

  const [forgotPassword, setForgotPassword] = useState(false);

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
      await loginWhitEmailAndPassword(credentials.email, credentials.password);
      setCredentials({
        email: "",
        password: "",
      });
      notify();
      setTimeout(() => setShowLogin(false), 2000);
    } catch (error) {
      //manejo de errores
      console.log(error.message);
      return notifyError(error.message);
    }
  };

  const resetHanlde = (e) => {
    e.preventDefault();
    setForgotPassword(true);
  };

  return (
    <Modal>
      {/* <div className="register__container"> */}
      {!forgotPassword ? (
        <form onSubmit={submitHandler} className="register__form">
          <ToastContainer />
          <button onClick={() => setShowLogin(false)}>X</button>
          <h3 className="register__title">Iniciar Sesión</h3>
          <label htmlFor="email">
            Email:{" "}
            <input
              type="email"
              name="email"
              value={credentials.email}
              id="email"
              placeholder="youremail@company.dtl"
              onChange={changeHandler}
            />
          </label>
          <label htmlFor="password">
            Password:{" "}
            <input
              type="password"
              value={credentials.password}
              name="password"
              id="password"
              placeholder="******"
              onChange={changeHandler}
            />
          </label>
          <button type="submit">Iniciar Sesión</button>
          <button type="button" onClick={resetHanlde}>
            ¿Olvidaste tu contraseña?
          </button>
          <LoginGoogle />
        </form>
      ) : (
        <ForgotPassword setForgotPassword={setForgotPassword} />
      )}
      {/* </div> */}
    </Modal>
  );
}

export default Login;
