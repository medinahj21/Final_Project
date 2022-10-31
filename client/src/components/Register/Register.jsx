import React, { useState } from "react";

import { notify, notifyError } from "../../utils/toastify";
import { firebaseError } from "../../utils/firebaseErrors";
import { sendVerificationEmail } from "../../utils/EmailVerification";

import LoginGoogle from "./LoginGoogle";

import { registerWhitEmailAndPassword } from "../../redux/actions/auth";
import { auth } from "../../firebase/firebase.config";

function Register({ setShowRegister, setShowLogin }) {
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

      await sendVerificationEmail(auth.currentUser);

      notify();
      setTimeout(() => {
        setShowLogin(false);
        setShowRegister(false);
      }, 2000);

      setCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
      return notifyError(firebaseError(error.message));
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
