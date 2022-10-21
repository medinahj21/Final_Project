import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  loginWhitEmailAndPassword,
  registerWhitEmailAndPassword,
} from "../../../redux/actions/auth";
import Modal from "../../UI/Modal";
import ForgotPassword from "../ForgotPassword";
import "./LoginRegister.css";

function LoginRegister({
  setShowLogin,
  setShowRegister,
  showLogin,
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

  const submitHandlerRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWhitEmailAndPassword(
        credentials.email,
        credentials.password
      );
      setCredentials({
        email: "",
        password: "",
      });
      notify("Vamos a darnos de alta !");
      setTimeout(() => setShowRegister(false), 2000);
    } catch (error) {
      console.log(error.message);
      return notifyError(error.message);
    }
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
      setTimeout(() => setShowLogin(false), 2000);
    } catch (error) {
      //manejo de errores
      console.log(error.message);
      return notifyError(error.message);
    }
  };

  return (
    <Modal>
      <section class="user">
        <ToastContainer />

        {!forgotPassword ? (
          <div class="user_options-container">
            <div class="user_options-text">
              <div class="user_options-unregistered">
                <h2 class="user_unregistered-title">¿No tienes una cuenta?</h2>
                <p class="user_unregistered-text">
                  Registrate y forma parte del Wolves Club - Voleyball !
                </p>
                <button
                  onClick={() => setBounceRight(false)}
                  class="user_unregistered-signup"
                  id="signup-button"
                >
                  Registrarse
                </button>
              </div>

              <div class="user_options-registered">
                <h2 class="user_registered-title">¿Ya tienes una cuenta?</h2>
                <p class="user_registered-text">
                  Inicia sesión así estaras siempre informado, podras pagar tus
                  cuotas y.. comprar indumentaria del club !!
                </p>
                <button
                  onClick={() => setBounceRight(true)}
                  class="user_registered-login"
                  id="login-button"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>

            <div class={`user_options-forms ${bounce}`} id="user_options-forms">
              <div class="user_forms-login">
                <h2 class="forms_title">Iniciar sesión</h2>
                <form class="forms_form" onSubmit={loginSubmitHandler}>
                  <fieldset class="forms_fieldset">
                    <div class="forms_field">
                      <input
                        value={credentials.email}
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        class="forms_field-input"
                        autofocus
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
                  </fieldset>
                  <div class="forms_buttons">
                    <button
                      type="button"
                      class="forms_buttons-forgot"
                      onClick={() => {
                        setForgotPassword(true);
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                    <input
                      type="submit"
                      value="Iniciar Sesión"
                      class="forms_buttons-action"
                    />
                  </div>
                </form>
              </div>
              <div class="user_forms-signup">
                <h2 class="forms_title">Registrarse</h2>
                <form class="forms_form" onSubmit={submitHandlerRegister}>
                  <fieldset class="forms_fieldset">
                    <div class="forms_field">
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        class="forms_field-input"
                      />
                    </div>
                    <div class="forms_field">
                      <input
                        type="password"
                        placeholder="Contraseña"
                        class="forms_field-input"
                      />
                    </div>
                  </fieldset>
                  <div class="forms_buttons">
                    <input
                      type="submit"
                      value="Registrarse"
                      class="forms_buttons-action"
                    />
                  </div>
                </form>
              </div>
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
