import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import LoginGoogle from "./LoginGoogle";

function Register() {
  const { signup, user } = useAuth();

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
    await signup(credentials.email, credentials.password);

    // const docRef = doc(firestore, `usuarios/${user.user.uid}`);
    // await setDoc(docRef, { email: credentials.email, id: user.user.uid });

    setCredentials({
      email: "",
      password: "",
    });
  };

  if (user) return <Navigate to={"/"} />;

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
        <button>Registrarse</button>
      </form>
      <LoginGoogle />
    </div>
  );
}

export default Register;
