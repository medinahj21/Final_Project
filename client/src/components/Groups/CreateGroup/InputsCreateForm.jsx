import React from "react";

function InputsCreateForm({ groupInputs, handleChange }) {
  return (
    <>
      <label htmlFor="name">
        Nombre:{" "}
        <input
          type="text"
          name="name"
          value={groupInputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="location">
        Locación:{" "}
        <input
          type="text"
          name="location"
          value={groupInputs.location}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="schedule">
        Horario:{" "}
        <input
          type="text"
          name="schedule"
          value={groupInputs.schedule}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Descripción:{" "}
        <textarea
          name="description"
          value={groupInputs.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="inscription_cost">
        Costo de inscripción:{" "}
        <input
          type="number"
          name="inscription_cost"
          value={groupInputs.inscription_cost}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="contact">
        Contacto:{" "}
        <input
          type="text"
          name="contact"
          value={groupInputs.contact}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="whatsappGroup">
        Grupo de WhatsApp:{" "}
        <input
          type="text"
          name="whatsapp"
          value={groupInputs.whatsapp}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="accept_newPlayers">
        Acepta nuevos:{" "}
        <select
          defaultValue="disabled"
          name="accept_newPlayers"
          onChange={handleChange}
        >
          <option value="disabled" disabled="true">
            Escoga una opción
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      <label htmlFor="category">
        Categoria:{" "}
        <select name="category" onChange={handleChange} defaultValue="disabled">
          <option value="disabled" disabled={true}>
            Escoge una opcion
          </option>
          <option value="Mixto">Mixto</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Adultos">Adultos</option>
        </select>
      </label>
      <label htmlFor="genre">
        Genero:{" "}
        <input
          type="radio"
          name="genre"
          value="Female"
          onChange={handleChange}
        />
        Femenino
        <input type="radio" name="genre" value="Male" onChange={handleChange} />
        Masculino
        <input type="radio" name="genre" value="Mix" onChange={handleChange} />
        Mixto
      </label>
      <label htmlFor="adminId">
        AdminID: <input type="text" name="adminId" onChange={handleChange} />
      </label>
    </>
  );
}

export default InputsCreateForm;
