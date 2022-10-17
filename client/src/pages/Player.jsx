import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import FOTO from "../images/icono-marco-fotos-foto.webp";

import "./Admin.css";
import InfoCard from "../components/UI/InfoCard";

function Admin() {
  const [clickChoice, setClickChoice] = useState({
    isPerfil: true,
    isSocios: false,
  });

  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const handleChance = (value) => {
    if (value === "perfil") {
      setClickChoice({
        isPerfil: true,
        isSocios: false,
        isGrupo: false,
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
        <img
          className="navbar__image"
          src={userInfoFirestore.image || FOTO}
          alt="foto de usuario"
        />
        <button
          className={
            clickChoice.isPerfil
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => handleChance("perfil")}
        >
          Perfil
        </button>
        <button
          className={
            clickChoice.isGrupo
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => handleChance("socios")}
        >
          Mi grupo
        </button>
        <button
          className={
            clickChoice.isSocios
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => handleChance("socios")}
        >
          Pagos
        </button>
        <Link to={"/"}>
          <button className="navbar__btn">Inicio</button>
        </Link>
        <Link to={"/products"}>
          <button className="navbar__btn">Tienda</button>
        </Link>
      </div>
      <div className="admin__content">
        <h1 className="admin__title">Bienvenido: {userInfoFirestore?.email}</h1>
        {clickChoice.isPerfil && (
       <InfoCard userInfoFirestore={userInfoFirestore}/>
        )}
      </div>
    </div>
  );
}

export default Admin;
