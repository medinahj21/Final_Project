import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { auth } from "../../../firebase/firebase.config";

import { loginWhitEmailAndPassword } from "../../../redux/actions/auth";
import { registerWhitEmailAndPassword } from "../../../redux/actions/auth";

import { sendVerificationEmail } from "../../../utils/EmailVerification";
import { firebaseError } from "../../../utils/firebaseErrors";
import {
  notifyError,
  notifyLoad,
  notify,
  dismissAll,
} from "../../../utils/toastify";

import Modal from "../../UI/Modal";
import ForgotPassword from "../ForgotPassword";
import LoginGoogle from "../LoginGoogle";

import "./LoginRegisterMob.css";

function LoginRegisteMob({ setShowLogin, setShowRegister, showLogin }) {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(!showLogin);

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

  const changeCheckedHanlder = (e) => {
    setIsChecked(!isChecked);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await loginWhitEmailAndPassword(credentials.email, credentials.password);

      setCredentials({
        email: "",
        password: "",
      });

      notifyLoad("Iniciando usuario");

      setTimeout(() => {
        dismissAll();
      }, 4000);

      setTimeout(() => {
        const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            notify(`Bienvendi@ ${currentUser.email}`);
          }
        });
        unSuscribe();
      }, 5000);

      setTimeout(() => {
        setShowLogin(false);
        setShowRegister(false);
      }, 6000);
    } catch (error) {
      console.log(error.message);
      return notifyError(firebaseError(error.message));
    }
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

  const closeHanlder = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <Modal clickHandler={closeHanlder}>
      <ToastContainer />
      {!forgotPassword ? (
        <div className="section__login-register">
          <div className=" full-height background-transparent">
            <div className="login-register">
              <span>Registrarse</span>
              <span>Iniciar sesión</span>
            </div>
            <div className="section">
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
                checked={!isChecked}
                onChange={changeCheckedHanlder}
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap">
                <div className="card-3d-wrapper">
                  <form className="card-front" onSubmit={submitHandler}>
                    <div className="center-wrap">
                      <div className="section-inputs">
                        <h4>Registrarse</h4>
                        <div className="form-group">
                          <input
                            value={credentials.email}
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            value={credentials.password}
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            onChange={changeHandler}
                          />
                        </div>
                        <button type="submit" href="#!" className="btn">
                          Registrarse
                        </button>
                        <LoginGoogle />
                      </div>
                    </div>
                  </form>
                  <form className="card-back" onSubmit={loginSubmitHandler}>
                    <div className="center-wrap">
                      <div className="section-inputs">
                        <h4>Iniciar sesión</h4>
                        <div className="form-group">
                          <input
                            value={credentials.email}
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            onChange={changeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            value={credentials.password}
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            onChange={changeHandler}
                          />
                        </div>
                        <button type="submit" href="#!" className="btn">
                          Iniciar sesión
                        </button>
                        <LoginGoogle />
                        <p>
                          <a
                            href="#0"
                            className="link"
                            onClick={() => setForgotPassword(true)}
                          >
                            ¿Olvidaste tu contraseña?
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ForgotPassword setForgotPassword={setForgotPassword} />
      )}
    </Modal>
  );
}

export default LoginRegisteMob;
