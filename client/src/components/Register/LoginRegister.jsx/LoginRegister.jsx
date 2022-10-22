import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loginWhitEmailAndPassword } from "../../../redux/actions/auth";

import Modal from "../../UI/Modal";
import ForgotPassword from "../ForgotPassword";
import LoginGoogle from "../LoginGoogle";
import Register from "../Register";

import "./LoginRegister.css";

function LoginRegister({
  setShowLogin,
  setShowRegister,
  showLogin,
  setShowAlta,
}) {
  const [bounceRight, setBounceRight] = useState(showLogin);

  const bounce = bounceRight ? "bounceRight" : "bounceLeft";

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

  const closeHanlder = () => {
    setShowAlta(false);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <Modal onClick={closeHanlder}>
      <section className="user">
        <ToastContainer />
        {!forgotPassword ? (
          <div className="user_options-container">
            <div className="user_options-text">
              <div className="user_options-unregistered">
                <h2 className="user_unregistered-title">
                  ¿No tienes una cuenta?
                </h2>
                <p className="user_unregistered-text">
                  Registrate y forma parte del Wolves Club - Voleyball !
                </p>
                <button
                  onClick={() => setBounceRight(false)}
                  className="user_unregistered-signup"
                  id="signup-button"
                >
                  Registrarse
                </button>
              </div>

              <div className="user_options-registered">
                <h2 className="user_registered-title">
                  ¿Ya tienes una cuenta?
                </h2>
                <p className="user_registered-text">
                  Inicia sesión así estaras siempre informado, podras pagar tus
                  cuotas y.. comprar indumentaria del club !!
                </p>
                <button
                  onClick={() => setBounceRight(true)}
                  className="user_registered-login"
                  id="login-button"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>

            <div
              className={`user_options-forms ${bounce}`}
              id="user_options-forms"
            >
              <div className="user_forms-login">
                <h2 className="forms_title">Iniciar sesión</h2>
                <form className="forms_form" onSubmit={loginSubmitHandler}>
                  <div className="forms_field">
                    <input
                      value={credentials.email}
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className="forms_field-input"
                      autofocus
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
                    <input
                      type="submit"
                      value="Iniciar Sesión"
                      className="forms_buttons-action"
                    />
                    <LoginGoogle />
                  </div>
                </form>
                <button
                  type="button"
                  className="forms_buttons-forgot"
                  onClick={() => {
                    setForgotPassword(true);
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Register
                setShowAlta={setShowAlta}
                setShowLogin={setShowLogin}
                setShowRegister={setShowRegister}
              />
            </div>
          </div>
        ) : (
          <ForgotPassword setForgotPassword={setForgotPassword} />
        )}
      </section>
    </Modal>
  );
}

export default LoginRegister;

// <div class="user_forms-signup">
//   <h2 class="forms_title">Registrarse</h2>
//   <form class="forms_form" onSubmit={submitHandlerRegister}>
//     <fieldset class="forms_fieldset">
//       <div class="forms_field">
//         <input
//           value={credentials.email}
//           type="email"
//           name="email"
//           placeholder="Correo electrónico"
//           class="forms_field-input"
//           onChange={changeHandler}
//         />
//       </div>
//       <div class="forms_field">
//         <input
//           value={credentials.password}
//           type="password"
//           name="password"
//           placeholder="Contraseña"
//           class="forms_field-input"
//           onChange={changeHandler}
//         />
//       </div>
//     </fieldset>
//     <div class="forms_buttons">
//       <button
//         type="submit"
//         value="Registrarse"
//         class="forms_buttons-action"
//       >
//         Registrarse
//       </button>
//     </div>
//   </form>
// </div>
