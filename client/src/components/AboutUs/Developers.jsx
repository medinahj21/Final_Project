import React from "react";
import edinson from "../../images/edinson.png";

const Developers = (devs) => {

  return (
    <div>
      
      
      <div className="contenedor-texto-testimonio">
        <img
        className="imagen-developer"
        alt="profile"
        src={require(`../../images/${devs.imagen}.jpg`)}
        />
        <p className="nombre-testimonio">
          <strong>{devs.nombre}</strong> de {devs.pais}
        </p>
        <p className="cargo-testimonio">
          <strong>Rol en el proyecto: </strong>{devs.rol}
        </p>
        <p
          className="texto-testimonio"
          dangerouslySetInnerHTML={{ __html: devs.testimonio }}
        ></p>
      </div>
    </div>
  );
};

export default Developers;
