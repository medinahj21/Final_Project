import React from "react";

const Developers = (devs) => {

  return (
    <div>
      
      
      <div className="container-developer">
        <img
        className="image-developer"
        alt="profile"
        src={require(`../../images/${devs.imagen}.jpg`)}
        />
        <p className="name-developer">
          <strong>{devs.nombre}</strong> de {devs.pais}
        </p>
        <p className="rol-project">
          <strong>Rol en el proyecto: </strong>{devs.rol}
        </p>
        <p
          className="text-developer"
          dangerouslySetInnerHTML={{ __html: devs.testimonio }}
        ></p>
      </div>
    </div>
  );
};

export default Developers;
