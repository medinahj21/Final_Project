import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import LoginGoogle from "../components/Register/LoginGoogle";
import { registerWhitEmailAndPassword } from "../redux/actions/auth";

function Register() {
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.authReducer);
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

    registerWhitEmailAndPassword(credentials.email, credentials.password);

    setCredentials({
      email: "",
      password: "",
    });

    navigate("/form-user");
  };

  if (email && email !== "") return <Navigate to={"/"} />;

  return (
    <div>
      <h2>Registrarse</h2>
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
        <button type="submit">Registrarse</button>
      </form>
      <LoginGoogle />
    </div>
  );
}

export default Register;
