import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from "../../../redux/actions/event";

import Tags from "../../../components/Tag/Tags";

import s from "../FormEvent/FormEvent.module.css";

export default function FormCalendario({ handleModal, getEvents }) {
  const dispatch = useDispatch();
  const [isUpdate, setisUpdate] = useState(false);
  const [isRepetitive, setIsRepetitive] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    state: "",
    description: "",
    location: "",
    repetitive: "",
    date: [],
    groups: [],
    start: "",
    end: "",
  });
  const groups = useSelector((state) => state.groupReducer.groups);
  console.log(groups);
  const deleteTag = (e) => {
    setInputs({
      ...inputs,
      date: [...inputs.date.filter((tag) => tag !== e)],
    });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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
  const handleChangeGroups = (e) => {
    let valor = e.target.value;
    if (valor === "") {
      return alert("Este campo no puede ser vacio");
    }
    if (inputs.groups.includes(valor)) {
      return alert("El grupo ya fue añadido a la lista");
    }
    setInputs({
      ...inputs,
      groups: [...inputs.groups, e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await dispatch(action.createEvent(inputs));
    if (response.error) return alert(`algo salio mal: ${response.error}`);
    handleModal();
    setInputs("");

    alert("Event has been created successfully");
    dispatch(getEvents());
  };

  const handleRepetitive = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (e.target.value === "true") {
      setInputs({ ...inputs, date: [] });
      setInputs({ ...inputs, [e.target.name]: e.target.value });
      return setIsRepetitive(true);
    }
    setIsRepetitive(false);
  };

  console.log(inputs);
  return (
    <div className={s.formEventContainer}>
      <section className={s.itemHeaderContainer}>
        <button type="button" onClick={() => handleModal()}>
          X
        </button>
        <div className={s.item}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div className={s.item}>
          <label htmlFor="state">Estado:</label>
          <select name="state" onChange={handleChange}>
            <option value="s" selected={true} disabled={true}>
              Selecciona una opción
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
        </div>
      </section>
      <section className={s.itemBodyContainer}>
        <div className={s.item}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Escribe aquí"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={s.item}>
          <label htmlFor="location">Ubicación:</label>
          <input
            name="location"
            cols="30"
            rows="10"
            placeholder="Escribe aquí"
            onChange={handleChange}
          />
        </div>
        <div className={s.inputsRadio}>
          <label htmlFor="repetitive">Repetitivo:</label>
          <div className={s.radios}>
            <input
              type="radio"
              name="repetitive"
              value={true}
              onChange={handleRepetitive}
            />
            <span>true</span>
            <input
              type="radio"
              name="repetitive"
              value={false}
              onChange={handleRepetitive}
            />
            <span>false</span>
          </div>
        </div>
        {isRepetitive !== "" ? (
          isRepetitive ? (
            <div className={s.repetitiveInputs}>
              <div className={s.repetitiveItems}>
                <div className={s.item}>
                  <label htmlFor="date">Días</label>
                  <select
                    className={s.selectDays}
                    name="date"
                    onChange={(e) => handleChangeDays(e)}
                  >
                    <option selected value="s" disabled={true}>
                      Selecciona una opción
                    </option>
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miercoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sabado</option>
                    <option value="domingo">Domingo</option>
                  </select>
                </div>
                <div className={s.item}>
                  <label htmlFor="start">Inicio:</label>
                  <input type="time" name="start" onChange={handleChange} />
                </div>
                <div className={s.item}>
                  <label htmlFor="end">Final: </label>
                  <input type="time" name="end" onChange={handleChange} />
                </div>
              </div>
              <>
                <div className={s.containerDays}>
                  {inputs.date?.map((e) => {
                    return <Tags value={e} deleteTag={deleteTag} />;
                  })}
                </div>
              </>
            </div>
          ) : (
            <div className={s.noRepetitiveInputs}>
              <div className={s.item}>
                <label htmlFor="date">Fecha: </label>
                <input type="date" name="date" onChange={handleChangeDays} />
              </div>
              <div className={s.item}>
                <label htmlFor="start">Inicio:</label>
                <input type="time" name="start" onChange={handleChange} />
              </div>
              <div className={s.item}>
                <label htmlFor="end">Final: </label>
                <input type="time" name="end" onChange={handleChange} />
              </div>
            </div>
          )
        ) : (
          ""
        )}
        <div className={s.item}>
          <label htmlFor="groups">Grupos Convocados</label>
          <select name="groups" onChange={(e) => handleChangeGroups(e)}>
            <option selected value="s" disabled={true}>
              Selecciona una opción
            </option>
            {groups.map((group) => {
              return (
                <option value={group.id} key={group.id}>
                  {group.name}
                </option>
              );
            })}
          </select>
        </div>
        {inputs.groups.length ? (
          <div>
            <h4>Has seleccionado estos grupos: </h4>
            <div className={s.groupsSelectedContainer}>
              {inputs.groups?.map((el) => {
                return (
                  <div key={el} className={s.groupsSelected}>
                    <p>{groups.find((gr) => gr.id === el).name} </p>
                    <div>✖</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <br></br>
        )}
      </section>
      <button className={s.buttonSubmitEvent} onClick={(e) => handleSubmit(e)}>
        Aceptar
      </button>
    </div>
  );
}
