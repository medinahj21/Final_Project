import React from "react";
import { TbArrowBigRightLines } from "react-icons/tb";

import "./Perfil.css";

function Perfil({ userInfoFirestore, image }) {
  const IMAGE = image
    ? image
    : "https://img.freepik.com/vector-gratis/silueta-voleibol-diseno-plano_23-2149400509.jpg?w=826&t=st=1666380508~exp=1666381108~hmac=8abfd0b7c72e3d27b94e38985546257c77caa318603a9a228bcb16241dae11b0";
  return (
    <div className="container__perfil">
      <div class="wrap animate pop">
        <div class="overlay">
          <div class="overlay-content animate slide-left delay-2">
            <h3 class="animate slide-left pop delay-4 title-perfil">
              Mi informacion
              personal <TbArrowBigRightLines />
            </h3>
            <p
              class="animate slide-left pop delay-5"
              style={{ color: "white", marginBottom: "2.5rem" }}
            >
              {userInfoFirestore.name}
            </p>
          </div>
          <div
            class="image-content animate slide delay-5"
            style={{
              background: `url(${IMAGE}) center`,
            }}
          ></div>
          <div class="dots animate">
            <div class="dot animate slide-up delay-6"></div>
            <div class="dot animate slide-up delay-7"></div>
            <div class="dot animate slide-up delay-8"></div>
          </div>
        </div>
        <div class="text">
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
      </div>
    </div>
  );
}

export default Perfil;
