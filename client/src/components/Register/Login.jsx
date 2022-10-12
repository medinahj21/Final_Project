import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import LoginGoogle from "./LoginGoogle";

function Login() {
  const { login, user } = useAuth();

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
      await login(credentials.email, credentials.password);

      setCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      //manejo de errores
    }
  };

  if (user) return <Navigate to={"/"} />;

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={submitHandler}>
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
        <button>Iniciar Sesión</button>
      </form>
      <LoginGoogle />
    </div>
  );
}

export default Login;
