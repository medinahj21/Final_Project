import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { getAllInfoUsers } from "../redux/actions/auth";

import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();
  const [clickChoice, setClickChoice] = useState({
    isPerfil: true,
    isSocios: false,
  });

  useEffect(() => {
    getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data());
      dispatch(getAllInfoUsers(docs));
    });
  }, [dispatch]);

  const { allUserFirestore, userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );

  const handleChance = (value) => {
    if (value === "perfil") {
      setClickChoice({
        isPerfil: true,
        isSocios: false,
      });
    }
    if (value === "socios") {
      setClickChoice({
        isPerfil: false,
        isSocios: true,
      });
    }
  };

  return (
    <div className="dashboard__container">
      <div className="admin__navbar">
        <Link to={"/products"}>Tienda</Link>
        <button onClick={() => handleChance("perfil")}>Perfil</button>
        <button onClick={() => handleChance("socios")}>Socios</button>
      </div>
      <div className="admin__content">
        <Link to={"/"}>Home</Link>
        <h1>Bienvenido: {userInfoFirestore?.email}</h1>
        {clickChoice.isPerfil && (
          <div>
            <h1>Bienvenid@: {userInfoFirestore.name}</h1>
            <p>Edad: {userInfoFirestore.years}</p>
            <p>Fecha de nacimiento: {userInfoFirestore.birthDate}</p>
            <p>Tipo de sangre: {userInfoFirestore.bloodType}</p>
            <p>Número de teléfono: {userInfoFirestore.cell}</p>
            <p>Tipo de documento: {userInfoFirestore.typeDoc}</p>
            <p>Documento: {userInfoFirestore.document}</p>
            <p>Email: {userInfoFirestore.email}</p>
            <h3>Contacto de emergencia: {userInfoFirestore.emergencyName}</h3>
            <p>Número de teléfono: {userInfoFirestore.emergencyContact}</p>
            <p>Parentesco: {userInfoFirestore.emergencyRel}</p>
            <p>Seguro de salud: {userInfoFirestore.health}</p>
          </div>
        )}
        {clickChoice.isSocios && (
          <div>
            {allUserFirestore ? (
              allUserFirestore.map((user) => {
                return !user.isAdmin ? (
                  <div key={userInfoFirestore.document + Math.random()}>
                    <h2>Nomnbre: {user.name}</h2>
                    <p>Edad: {user.years}</p>
                    <p>Fecha de nacimiento: {user.birthDate}</p>
                    <p>Tipo de sangre: {user.bloodType}</p>
                    <p>Número de teléfono: {user.cell}</p>
                    <p>Tipo de documento: {user.typeDoc}</p>
                    <p>Documento: {user.document}</p>
                    <p>Email: {user.email}</p>
                    <h3>Contacto de emergencia: {user.emergencyName}</h3>
                    <p>Número de teléfono: {user.emergencyContact}</p>
                    <p>Parentesco: {user.emergencyRel}</p>
                    <p>Seguro de salud: {user.health}</p>
                  </div>
                ) : (
                  <p>Cargando usuarios</p>
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
