import React from "react";
import { TbArrowBigRightLines } from "react-icons/tb";

import classes from "./Perfil.module.css";

export default function Perfil({ userInfoFirestore, image }) {
  const IMAGE = image
    ? image
    : "https://img.freepik.com/vector-gratis/silueta-voleibol-diseno-plano_23-2149400509.jpg?w=826&t=st=1666380508~exp=1666381108~hmac=8abfd0b7c72e3d27b94e38985546257c77caa318603a9a228bcb16241dae11b0";
  return (
    <div className={classes.containerPerfil}>
      <div className={`${classes.wrap} ${classes.animate} ${classes.pop}`}>
        <div className={classes.overlay}>
          <div
            className={`${classes.overlayContent} ${classes.animate} ${classes.slideLeft} ${classes.delay2}`}
          >
            <h3
              className={`${classes.animate} ${classes.slideLeft} ${classes.pop} ${classes.delay4} ${classes.titlePerfil}`}
            >
              Mi informacion personal <TbArrowBigRightLines />
            </h3>
            <p
              className={`${classes.animate} ${classes.slideLeft} ${classes.pop} ${classes.delay5}`}
              style={{ color: "white", marginBottom: "2.5rem" }}
            >
              {userInfoFirestore.name}
            </p>
          </div>
          <div
            className={`${classes.imageContent} ${classes.animate} ${classes.slide} ${classes.delay5}`}
            style={{
              background: ` url(${IMAGE}) center`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className={`${classes.dots} ${classes.animate}`}>
            <div
              className={`${classes.dot} ${classes.animate} ${classes.slideUp} ${classes.delay6}`}
            ></div>
            <div
              className={`${classes.dot} ${classes.animate} ${classes.slideUp} ${classes.delay7}`}
            ></div>
            <div
              className={`${classes.dot} ${classes.animate} ${classes.slideUp} ${classes.delay8}`}
            ></div>
          </div>
        </div>
        <div className={classes.text}>
          <p>Edad: {userInfoFirestore.years}</p>
          <p>Fecha de nacimiento: {userInfoFirestore.birthDate}</p>
          <p>Tipo de sangre: {userInfoFirestore.bloodType}</p>
          <p>Número de teléfono: {userInfoFirestore.cell}</p>
          <p>Tipo de documento: {userInfoFirestore.typeDoc}</p>
          <p>Documento: {userInfoFirestore.document}</p>
          <p>Email: {userInfoFirestore.email}</p>
          <h4>Contacto de emergencia: {userInfoFirestore.emergencyName}</h4>
          <p>Número de teléfono: {userInfoFirestore.emergencyContact}</p>
          <p>Parentesco: {userInfoFirestore.emergencyRel}</p>
          <p>Seguro de salud: {userInfoFirestore.health}</p>
        </div>
      </div>
    </div>
  );
}
