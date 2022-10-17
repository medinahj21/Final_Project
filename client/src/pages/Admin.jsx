import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { getAllInfoUsers } from "../redux/actions/auth";

import FOTO from "../images/icono-marco-fotos-foto.webp";
import "./Admin.css";
import InfoCard from "../components/UI/InfoCard";

function Admin() {
  const dispatch = useDispatch();
  const [clickChoice, setClickChoice] = useState({
    isPerfil: true,
    isSocios: false,
    isPagos: false,
    isGrupos: false,
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
        isPagos: false,
        isGrupos: false,
      });
    }
    if (value === "socios") {
      setClickChoice({
        isPerfil: false,
        isSocios: true,
        isPagos: false,
        isGrupos: false,
      });
    }
    if (value === "pagos") {
      setClickChoice({
        isPerfil: false,
        isSocios: false,
        isPagos: true,
        isGrupos: false,
      });
    }
    if (value === "grupos") {
      setClickChoice({
        isPerfil: false,
        isSocios: false,
        isPagos: false,
        isGrupos: true,
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
            clickChoice.isPagos
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => handleChance("pagos")}
        >
          Administracion de pagos
        </button>
        <button
          className={
            clickChoice.isSocios
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => handleChance("socios")}
        >
          Socios
        </button>
        <button
          className={
            clickChoice.isGrupos
              ? "navbar__btn navbar__btn-clicked"
              : "navbar__btn"
          }
          onClick={() => handleChance("grupos")}
        >
          Grupos
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
          <InfoCard userInfoFirestore={userInfoFirestore} />
        )}
        {clickChoice.isSocios && (
          <div className="cards__container">
            {allUserFirestore ? (
              allUserFirestore.map((user) => {
                return !user.isAdmin ? (
                  <InfoCard
                    key={userInfoFirestore.document + Math.random()}
                    userInfoFirestore={user}
                  />
                ) : (
                  <></>
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
