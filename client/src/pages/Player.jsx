import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Player() {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  return (
    <div>
      <Link to={"/"}>Home</Link>
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
  );
}

export default Player;
