import React, { useState } from "react";
import Bandera from "../../images/Bandera.jpg";
import foto1 from "../../images/foto1_about.png";
import edinson from "../../images/edinson.png";
import Developers from "./Developers";
import devs from "./props-devs";

import "./AboutUs.css";

const AboutUs = () => {
  const [showDevs, setShowDevs] = useState(false);

  return (
    <div className="aboutUs-container-main">
      <div className="left-side-aboutUs-text">
        <h1 className="first-div-text">Hora de conocernos...</h1>
        <h2 className="first-div-text">¿Quienes somos?</h2>
        <img src={Bandera} alt="flag" className="image-container1" />
      </div>
      <div className="second-section">
        <h2 className="second-div-text">Nuestra historia</h2>
        <p className="second-div-paragraph">
          La idea nace de la mano del profesor de educación física{" "}
          <b>Edinson Loaiza Arango</b>. En el año 2018 puso manos a la obra y
          seguido por chicos aficionados, abrieron el camino hacia la
          instauración del voleibol en la zona sur-oriental de la ciudad de
          Medellín. Con el transcurso del tiempo encontro y gracias a su pasión
          y entrega fueron sumandose mas jugadores a los entrenamientos lo que
          le permitió organizar diversos grupos clasificados por géneros y
          edades con un alto nivel de competitividad como para enfrentarse
          contra equipos más fuertes y de mayor tradición obteniendo buenos
          resultados. Así pues nace el que será el Club Wolves de Voleibol.
        </p>
      </div>
      <div className="third-section">
        <div className="third-section-container">
          <h2 className="third-div-text">Nuestros valores</h2>
          <h3 className="third-div-paragraph">
            En Club Wolves Volleyball fomentamos en nuestros jugadores los
            siguientes valores:
          </h3>
          <ul>
            <img src={foto1} alt="flag" className="image-container1" />
            <li>
              <p className="third-div-paragraph">
                <b>Mentalidad</b> comportamiento mental que fija una estructura
                solida y congruente hacia sus propósitos u objetivos deportivos.{" "}
              </p>
            </li>
            <li>
              <p className="third-div-paragraph">
                <b>Carácter</b> cualidad natural que distingue el ser humano
                frente a los demás en donde refleja y direcciona su energía en
                actitud frente a diferentes situaciones.{" "}
              </p>
            </li>
            <li>
              <p className="third-div-paragraph">
                <b>Disciplina</b> es un valor moral que contiene reglas y
                principios de comportamiento relativos al orden y a la
                constancia posibilitando un mejor desarrollo del ser.
              </p>
            </li>
            <li>
              <p className="third-div-paragraph">
                <b>Compromiso</b> el sentirnos comprometidos con una disciplina
                deportiva significa la capacidad que tenemos para tomar
                conciencia sobre la importancia de cumplir con lo acordado.{" "}
              </p>
            </li>
            <li>
              <p className="third-div-paragraph">
                <b>Sentido</b> de pertenencia fundamental para la identidad del
                club.
              </p>
            </li>
            <li>
              <p className="third-div-paragraph">
                <b>Lealtad</b> obrar con lealtad significa un sentimiento de
                respeto y fidelidad a los propios principios morales.
              </p>
            </li>
            <li>
              <p className="third-div-paragraph">
                <b>Respeto</b> a la ley y normas que rigen el deporte como
                también sus semejantes.{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="fourth-section">
        <div className="fourth-section-container">
          <h2 className="fourth-div-text">Acerca de nuestro fundador</h2>
          <p className="fourth-div-paragraph">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <img src={edinson} alt="flag" className="image-container1" />
        </div>
      </div>
      <div className="fifth-section">
        <div className="fifth-section-container">
          <h2 className="fifth-div-text">Nuestros deportistas opinan...</h2>
          <p className="fourth-div-paragraph">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <strong> Andres F. Valencia</strong>
          <p className="fourth-div-paragraph">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <strong> Maria Jose Cifuentes</strong>
          <p className="fourth-div-paragraph">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <strong> Jhon Doe</strong>
        </div>
      </div>
      <div className="seventh-section">
        <div className="seventh-section-container">
          <b className="about-developers" onClick={() => setShowDevs(true)}>
            {" "}
            Sobre los Desarrolladores{" "}
          </b>
          {showDevs ? (
            <div>
              {devs.map((dev, index) => {
                return <Developers {...dev} key={index} />;
              })}
              <b className="hide-developers" onClick={() => setShowDevs(false)}>
                Ocultar info de desarrolladores
              </b>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
