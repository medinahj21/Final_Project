import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions/event";
import { Toast } from "../../../utils/toastSweet";
import { Days } from "../../../utils/daysWeek";

import Tags from "../../../components/Tag/Tags";
import s from "../FormEvent/FormEvent.module.css";
import Swal from "sweetalert2";

export default function FormCalendario({ handleModal, getEvents }) {

  const dispatch = useDispatch();

  const [isUpdate, setisUpdate] = useState(false);
  const [isRepetitive, setIsRepetitive] = useState("");
  const [deuda, setDeuda] = useState(false);
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
    player: [],
  });

  const groups = useSelector((state) => state.groupReducer.groups);

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
    // logica de grupos 
    let groupsSelected = inputs.groups && groups.filter(gr => inputs.groups.includes(gr.id))
    let playersSelected = groupsSelected.map(gr => gr.players).flat()
    let idPlayers = playersSelected.map(player => player.id)

    e.preventDefault();
    Swal.fire({
      title: 'Estas seguro que quieres guardar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#01002E',
      denyButtonText: `No guardar`,
      target: document.getElementById('formEvent'),
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          let response = await dispatch(action.createEvent({
            ...inputs,
            player: idPlayers
          }));
          console.log(response);
          if (response.error) {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: `Algo salio mal: ${response.error}`,
              target: document.getElementById('formEvent')
            })
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Hecho!',
              text: `Se ha creado correctamente!`,
            })
            handleModal();
            setInputs("");
            dispatch(getEvents());
          }
        } else if (result.isDenied) {
          Toast.fire({
            icon: 'info',
            title: 'No ha sido creado!',
            target: document.getElementById('formEvent')
          })
        }
      })
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

  const handleDeuda = (e) => {
    setDeuda(e.target.value)
  }
  console.log(deuda);
  return (
    <form className={s.formEventContainer} id='formEvent'>
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
        <div>
          <div className={s.sectionContainer}>
            <div>

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
                  <span>Si</span>
                  <input
                    type="radio"
                    name="repetitive"
                    value={false}
                    onChange={handleRepetitive}
                  />
                  <span>No</span>
                </div>
              </div>
              <div className={s.inputsRadio}>
                <label htmlFor="repetitive">Generar Deuda:</label>
                <div className={s.radios}>
                  <input
                    type="radio"
                    name="repetitive"
                    value={true}
                    onChange={handleDeuda}
                  />
                  <span>Si</span>
                  <input
                    type="radio"
                    name="repetitive"
                    value={false}
                    onChange={handleDeuda}
                  />
                  <span>No</span>
                </div>
              </div>
            </div>
            {deuda === "true" ?
              <div className={s.itemSide}>
                <div className={s.item}>
                  <span> Deuda: </span>
                  <label htmlFor="concepto">Concepto: </label>
                  <input type="text" />
                </div>
                <div className={s.item}>
                  <label htmlFor="description">Detalle de la deuda: </label>
                  <textarea name="description" id="" cols="30" rows="10"></textarea>
                </div>
                <div className={s.item}>
                  <label htmlFor="monto">Monto: </label>
                  <input type="number" />
                </div>
              </div>
              :
              " "
            }
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
                    {Days.map((e) => {
                      return <option value={e.id}>{e.day}</option>
                    })}
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
                    let dayName = Days.find((d) => parseInt(d.id) === parseInt(e))
                    return <Tags value={dayName.day} deleteTag={deleteTag} />;
                  })}
                </div>
              </>
            </div>
          ) : (
            <div className={s.noRepetitiveInputs}>
              <div className={s.item}>
                <label htmlFor="date">Fecha: </label>
                <input type="date" name="date" onChange={handleChange} />
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
    </form>
  );
}
