import React from "react";
import edinson from "../../images/edinson.png";

const Developers = (devs, setShowDevs, isCreate) => {
  const handleClick = () => {
    setShowDevs(!setShowDevs);
  };

  return (
    <div>
      
      
      <div className="contenedor-texto-testimonio">
        <p className="nombre-testimonio">
          <strong>{devs.nombre}</strong> en {devs.pais}
        </p>
        <p className="cargo-testimonio">
          {devs.cargo} en <strong>{devs.empresa}</strong>
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
