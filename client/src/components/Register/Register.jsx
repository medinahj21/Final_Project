import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginGoogle from "./LoginGoogle";
// import { auth } from "../../firebase/firebase.config";
import { registerWhitEmailAndPassword } from "../../redux/actions/auth";
// import { sendVerificationEmail } from "../../utils/EmailVerification";

import "./Register.css";
import Modal from "../UI/Modal";
import FormUser from "./FormUser";

function Register({ setShowRegister }) {
  const [register, setRegister] = useState(false);
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
      setCredentials({
        email: "",
        password: "",
      });
      notify();
      setTimeout(() => setRegister(true), 4000);
    } catch (error) {
      console.log(error.message);
      return notifyError(error.message);
    }
  };

  return (
    <Modal>
      {!register ? (
        <form onSubmit={submitHandler} className="register__form">
          <ToastContainer />
          <button onClick={() => setShowRegister(false)}>X</button>
          <h3 className="register__title">Registrarse</h3>
          <label htmlFor="email">
            Email:{" "}
            <input
              type="email"
              value={credentials.email}
              name="email"
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
          <button type="submit">Registrarse</button>
          <LoginGoogle />
        </form>
      ) : (
        <FormUser />
      )}
    </Modal>
  );
}

export default Register;
