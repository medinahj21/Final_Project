import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";

import { loginWhitEmailAndPassword } from "../../../redux/actions/auth";
import { registerWhitEmailAndPassword } from "../../../redux/actions/auth";

import Modal from "../../UI/Modal";
import ForgotPassword from "../ForgotPassword";
import LoginGoogle from "../LoginGoogle";

import "./LoginRegisterMob.css";

function LoginRegisteMob({ setShowLogin, setShowRegister, setShowAlta }) {
  const [forgotPassword, setForgotPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const notifyError = (error) =>
    toast.error(error, {
      hideProgressBar: true,
      theme: "colored",
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const notify = (message) =>
    toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });

  const changeHandler = (e) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await loginWhitEmailAndPassword(credentials.email, credentials.password);
      setCredentials({
        email: "",
        password: "",
      });
      notify("Bienvenid@ !!!");
      setTimeout(() => {
        setShowLogin(false);
        setShowRegister(false);
      }, 2000);
    } catch (error) {
      //manejo de errores
      console.log(error.message);
      return notifyError(error.message);
    }
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
    <Modal>
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
              />
              <label for="reg-log"></label>
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
