import React from "react";

function InputsCreateForm({ groupInputs, handleChange }) {
  return (
    <>
      <div className="form__content-alta inputs-container">
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              value={groupInputs.name}
              type="text"
              name="name"
              placeholder="Nombre completo"
              className="forms_field-input"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              type="text"
              name="location"
              placeholder="Locación"
              className="forms_field-input"
              value={groupInputs.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              type="text"
              name="schedule"
              placeholder="Horario"
              className="forms_field-input"
              value={groupInputs.schedule}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              className="forms_field-input"
              value={groupInputs.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              type="number"
              name="inscription_cost"
              placeholder="Costo de inscripción"
              className="forms_field-input"
              value={groupInputs.inscription_cost}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              type="text"
              name="contact"
              placeholder="Contacto"
              className="forms_field-input"
              value={groupInputs.contact}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__content-inputs create-group-input">
          <div className="forms_field">
            <input
              type="text"
              name="whatsapp"
              placeholder=" Grupo de WhatsApp:"
              className="forms_field-input"
              value={groupInputs.whatsapp}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="inputs-container-bottom">
        <select
          className="select_container"
          defaultValue="disabled"
          name="accept_newPlayers"
          onChange={handleChange}
        >
          <option value="disabled" disabled={true}>
            Acepta nuevos
          </option>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>
        <select
          name="category"
          onChange={handleChange}
          defaultValue="disabled"
          className="select_container"
        >
          <option value="disabled" disabled={true}>
            Categoría
          </option>
          <option value="Mixto">Mixto</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Adultos">Adultos</option>
        </select>
        Genero:
        <label className="check__label">
          Femenino{" "}
          <input
            name="genre"
            value="Female"
            type="radio"
            onChange={handleChange}
          />
          <span className="check"></span>
        </label>
        <label className="check__label">
          Masculino{" "}
          <input
            name="genre"
            value="Male"
            type="radio"
            onChange={handleChange}
          />
          <span className="check"></span>
        </label>
        <label className="check__label">
          Mixto{" "}
          <input
            name="genre"
            value="Mix"
            type="radio"
            onChange={handleChange}
          />
          <span className="check"></span>
        </label>
      </div>
    </>
  );
}

export default InputsCreateForm;
