import React, { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginGoogle from "./LoginGoogle";
// import { auth } from "../../firebase/firebase.config";
import { registerWhitEmailAndPassword } from "../../redux/actions/auth";
// import { sendVerificationEmail } from "../../utils/EmailVerification";

import "./Register.css";

function Register() {
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
    } catch (error) {
      console.log(error.message);
      return notifyError(error.message);
    }
  };

  return (
    <>
      <div class="user_forms-signup">
        <h2 className="forms_title">Registrarse</h2>
        <form class="forms_form" onSubmit={submitHandler}>
          <div class="forms_field">
            <input
              value={credentials.email}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              class="forms_field-input"
              onChange={changeHandler}
            />
          </div>
          <div class="forms_field">
            <input
              value={credentials.password}
              type="password"
              name="password"
              placeholder="Contraseña"
              class="forms_field-input"
              onChange={changeHandler}
            />
          </div>
          <div class="forms_buttons">
            <button type="submit" class="forms_buttons-action">
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
