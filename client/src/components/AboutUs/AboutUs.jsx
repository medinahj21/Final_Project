import React from "react";
import Bandera from "../../images/Bandera.jpg";
import foto1 from "../../images/foto1_about.png";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutUs-container-main">
      <div className="left-side-aboutUs-text">
        <h1 className="first-div-text">Hora de conocernos...</h1>
        <h2 className="first-div-text">¿Quienes somos?</h2>
        <img src={Bandera} alt="flag" className="image-container1" />
      </div>
      <div className="second-section">
        <h1 className="second-div-text">Nuestra historia</h1>
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
        <h1 className="third-div-text">Nuestros valores</h1>
        <h3 className="third-div-paragraph">Club Wolves Volleyball </h3>
        <ul>
          <li> </li>
        </ul>
        <img src={foto1} alt="flag" className="image-container1" />
      </div>
    </div>
  );
};

export default AboutUs;
