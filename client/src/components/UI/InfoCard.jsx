import React from "react";

import FOTO from "../../images/siluetasinfondo.png";

import "./InfoCard.css";

function InfoCard({ userInfoFirestore, perfil }) {
  return (
    <div className={!perfil ? "card__info" : "card__info-perfil"}>
      <img
        className={!perfil ? "card__image" : "card__info-image"}
        src={FOTO}
        alt=""
      />
      <h2>{userInfoFirestore.name}</h2>
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

export default InfoCard;
