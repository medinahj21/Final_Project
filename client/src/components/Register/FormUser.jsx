import React, { useState } from "react";

function FormUser() {
  const [userInput, setUserInput] = useState({
    name: "",
    typeDoc: "",
    document: "",
    years: "",
    birthDate: "",
    cell: "",
    emergencyName: "",
    emergencyRel: "",
    emergencyContact: "",
    bloodType: "",
    health: "",
    specialConditions: "",
  });

  const changeHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <form>
      <label htmlFor="name">
        Nombre:{" "}
        <input
          type="text"
          value={userInput.name}
          name="name"
          id="name"
          placeholder="Your name"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="typeDoc">
        Tipo de documento:{" "}
        <input
          type="text"
          value={userInput.typeDoc}
          name="typeDoc"
          id="typeDoc"
          placeholder="your document type"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="document">
        Documento:{" "}
        <input
          type="number"
          value={userInput.document}
          name="document"
          id="document"
          placeholder="your document"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="years">
        Años:{" "}
        <input
          type="number"
          value={userInput.document}
          name="years"
          id="years"
          placeholder="your years"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="birthDate">
        Fecha de nacimiento:{" "}
        <input
          type="date"
          value={userInput.document}
          name="birthDate"
          id="birthDate"
          placeholder="your birthDate"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="cell">
        Número de teléfono:{" "}
        <input
          type="number"
          value={userInput.document}
          name="cell"
          id="cell"
          placeholder="your cell"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="emergencyContact">
        Número del contacto de emergencia:{" "}
        <input
          type="number"
          value={userInput.document}
          name="emergencyContact"
          id="emergencyContact"
          placeholder="Emergency contact"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="emergencyName">
        Nombre del contacto de emergencia:{" "}
        <input
          type="text"
          value={userInput.document}
          name="emergencyName"
          id="emergencyName"
          placeholder="Emergency name"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="bloodType">
        Tipo de sangre:{" "}
        <input
          type="text"
          value={userInput.document}
          name="bloodType"
          id="bloodType"
          placeholder="bloodType"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="health">
        seguro de salud:{" "}
        <input
          type="text"
          value={userInput.document}
          name="health"
          id="health"
          placeholder="health"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="specialConditions">
        Condiciones especiales de salud:{" "}
        <input
          type="text"
          value={userInput.document}
          name="specialConditions"
          id="specialConditions"
          placeholder="specialConditions"
          onChange={changeHandler}
        />
      </label>
      <button>Enviar</button>
    </form>
  );
}

export default FormUser;
