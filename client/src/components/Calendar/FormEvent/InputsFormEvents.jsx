import React from "react";

function InputsFormEvents({ handleChange, isUpdate }) {
  return (
    <>
      <div className="form-event-right">
        <div className="form-event-content">
          <div className="forms_field">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="forms_field-input"
              autoFocus
              onChange={handleChange}
            />
          </div>
          <div className="forms_field">
            <input
              type="text"
              name="location"
              placeholder="Ubicación"
              className="forms_field-input"
              autoFocus
              onChange={handleChange}
            />
          </div>
          <textarea
            className="forms_field-input"
            name="description"
            cols="30"
            rows="10"
            placeholder="Descripción del evento"
            onChange={handleChange}
          ></textarea>
        </div>
        <select name="state" onChange={handleChange}>
          <option value="s" selected={true} disabled={true}>
            Estado del evento
          </option>
          <option value="Pending">Pendiente</option>
          {isUpdate ? (
            <>
              <option value="Canceled">Cancelado</option>
              <option value="Postponed">Aplazado</option>
              <option value="Finished">Finalizado</option>
            </>
          ) : (
            ""
          )}
        </select>

        <select name="type" onChange={handleChange}>
          <option value="s" selected={true} disabled={true}>
            Tipo de evento
          </option>
          <option value="Entrenamiento">Entrenamiento</option>
          <option value="Partido">Partido</option>
          <option value="Torneo">Torneo</option>
          <option value="Evento Especial">Evento Especial</option>
        </select>
      </div>
    </>
  );
}

export default InputsFormEvents;
