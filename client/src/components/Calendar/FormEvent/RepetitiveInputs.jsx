import React, { useState } from "react";
import Tags from "../../Tag/Tags";
import { Days } from "../../../utils/daysWeek";

function RepetitiveInputs({
  deuda,
  setDeuda,
  handleChange,
  setNewDebt,
  inputs,
  setInputs,
}) {
  const [isRepetitive, setIsRepetitive] = useState("");

  const handleRepetitive = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (e.target.value === "true") {
      setInputs({ ...inputs, date: [] });
      setInputs({ ...inputs, [e.target.name]: e.target.value });
      return setIsRepetitive(true);
    }
    setIsRepetitive(false);
  };

  const handleChangeDays = (e) => {
    let valor = e.target.value;
    if (valor === "") {
      return alert("Este campo no puede ser vacio");
    }
    if (inputs.date.includes(valor)) {
      return alert("El día ya fue añadido a la lista");
    }
    setInputs({
      ...inputs,
      date: [...inputs.date, e.target.value],
    });
  };

  const deleteTag = (e) => {
    const idToDelete = Days.find((d) => d.day === e).id;
    setInputs({
      ...inputs,
      date: [...inputs.date.filter((tag) => Number(tag) !== idToDelete)],
    });
  };

  const handleDeuda = (e) => {
    setDeuda(e.target.value);
  };

  const handleNewDebt = (e) => {
    setNewDebt((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <div>
        <div className="size-container">
          Evento repetitivo
          <label className="check__label">
            Si
            <input
              name="repetitive"
              value={true}
              type="radio"
              onChange={handleRepetitive}
            />
            <span className="check"></span>
          </label>
          <label className="check__label">
            No
            <input
              name="repetitive"
              value={false}
              type="radio"
              onChange={handleRepetitive}
            />
            <span className="check"></span>
          </label>
        </div>
        <div className="size-container">
          Generar Deuda
          <label className="check__label">
            Si
            <input
              name="deuda"
              value={true}
              type="radio"
              onChange={handleDeuda}
            />
            <span className="check"></span>
          </label>
          <label className="check__label">
            No
            <input
              name="deuda"
              value={false}
              type="radio"
              onChange={handleDeuda}
            />
            <span className="check"></span>
          </label>
        </div>
        {deuda === "true" && (
          <div>
            <div className="form-event-content">
              <div className="forms_field">
                <input
                  type="text"
                  name="concept"
                  placeholder="Concepto"
                  className="forms_field-input"
                  autoFocus
                  onChange={handleNewDebt}
                />
              </div>
              <textarea
                className="forms_field-input"
                name="description"
                cols="30"
                rows="10"
                placeholder="Detalle de la deuda"
                onChange={handleNewDebt}
              ></textarea>
              <div className="forms_field">
                <input
                  type="number"
                  name="value"
                  placeholder="Monto"
                  className="forms_field-input"
                  autoFocus
                  onChange={handleNewDebt}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {isRepetitive !== "" && isRepetitive ? (
        <div>
          <select
            name="date"
            defaultValue={"s"}
            onChange={(e) => handleChangeDays(e)}
          >
            <option selected value="s" disabled={true}>
              Elija los días
            </option>
            {Days.map((e) => {
              return <option value={e.id}>{e.day}</option>;
            })}
          </select>
          <div className="form-event-content">
            <div className="forms_field">
              Inicio
              <input
                type="time"
                name="start"
                placeholder="Fecha"
                className="forms_field-input"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="forms_field">
              Final
              <input
                type="time"
                name="end"
                placeholder="Fecha"
                className="forms_field-input"
                autoFocus
                onChange={handleChange}
              />
            </div>
          </div>
          <>
            <div>
              {inputs.date?.map((e) => {
                let dayName = Days.find((d) => parseInt(d.id) === parseInt(e));
                return <Tags value={dayName.day} deleteTag={deleteTag} />;
              })}
            </div>
          </>
        </div>
      ) : (
        <div>
          <div className="form-event-content">
            <div className="forms_field">
              Fecha
              <input
                type="date"
                name="date"
                placeholder="Fecha"
                className="forms_field-input"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="forms_field">
              Inicio
              <input
                type="time"
                name="start"
                placeholder="Fecha"
                className="forms_field-input"
                autoFocus
                onChange={handleChange}
              />
            </div>
            <div className="forms_field">
              Final
              <input
                type="time"
                name="end"
                placeholder="Fecha"
                className="forms_field-input"
                autoFocus
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepetitiveInputs;
