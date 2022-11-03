import React from "react";

import FOTO from "../../images/profeVoley.jpeg";

import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-title-container">
        <h2 className="about-title">Sobre nosotros</h2>
      </div>
      <div className="about-history">
        <h3>Nuestra historia</h3>
        <h4>
          La vida golpea duro y solo los ganadores aguantan los golpes y se
          levantan de nuevo.
        </h4>
        <div className="about-content">
          <div>
            <p>
              Luego de recibir la dura noticia de no ser mas profesor de
              educación física, el profesor <b>Edinson Loaiza Arango</b> decidió
              aguantar el golpe y levantarse de nuevo.
            </p>
            <p>
              En el año 2018 puso manos a la obra y seguido por chicos
              aficionados, abrieron el camino hacia la instauración del voleibol
              en la zona sur-oriental de la ciudad de Medellín. Con el
              transcurso del tiempo y gracias a su <b>pasión y entrega </b>
              fueron sumandose mas jugadores a los entrenamientos, lo que nos
              permitió organizar diversos grupos clasificados por géneros y
              edades con un alto nivel de competitividad. Así pues nace el{" "}
              <b>Club Wolves de Voleibol</b>.
            </p>
          </div>
          <img className="image-history" src={FOTO} alt="people - clubwolves" />
        </div>
      </div>
    </div>
  );
}

export default About;
