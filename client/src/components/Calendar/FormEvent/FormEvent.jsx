import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../redux/actions/event";
import { Toast } from "../../../utils/toastSweet";
import { Days } from "../../../utils/daysWeek";

import Tags from "../../../components/Tag/Tags";
import Swal from "sweetalert2";
import axios from "axios";

import "./FormEvent.css";
import InputsFormEvents from "./InputsFormEvents";
import RepetitiveInputs from "./RepetitiveInputs";

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
    const idToDelete = Days.find((d) => d.day === e).id;
    setInputs({
      ...inputs,
      date: [...inputs.date.filter((tag) => Number(tag) !== idToDelete)],
    });
  };

  const deleteGroup = (e) => {
    setInputs({
      ...inputs,
      groups: [...inputs.groups.filter((group) => group !== e.target.id)],
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
    /*  e.preventDefault()
    let groupsSelected =
      inputs.groups && groups.filter((gr) => inputs.groups.includes(gr.id));
    console.log(groupsSelected); */
    let groupsSelected =
      inputs.groups && groups.filter((gr) => inputs.groups.includes(gr.id));
    let playersSelected = groupsSelected.map((gr) => gr.players).flat();
    let idPlayers = playersSelected.map((player) => player.id);
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro que quieres guardar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#01002E",
      denyButtonText: `No guardar`,
      target: document.getElementById("formEvent"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await dispatch(
          action.createEvent({
            ...inputs,
            player: idPlayers,
          })
        );
        // ------------- genero deuda asociada ------------
        if (deuda && !response.error) {
          const formatedDebt = {
            concept: newDebt.concept,
            value: newDebt.value,
            description: newDebt.description,
            payment_term: 1,
            order_state: "Pending",
            type_order: "club",
          };
          idPlayers.length &&
            idPlayers.forEach(async (id) => {
              await axios.post(`${axios.defaults.baseURL}/orders/create`, {
                ...formatedDebt,
                playerId: id,
              });
            });
        }
        if (response.error) {
          Toast.fire({
            icon: "error",
            title: "Error",
            text: `Algo salio mal`,
            target: document.getElementById("formEvent"),
          });
        } else {
          Toast.fire({
            icon: "success",
            title: "Hecho!",
            text: `Se ha creado correctamente!`,
          });
          handleModal();
          setInputs("");
          dispatch(getEvents());
        }
      } else if (result.isDenied) {
        Toast.fire({
          icon: "info",
          title: "No ha sido creado!",
          target: document.getElementById("formEvent"),
        });
      }
    });
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
    setDeuda(e.target.value);
  };

  const [newDebt, setNewDebt] = useState({
    concept: "",
    description: "",
    value: 0,
  });

  const handleNewDebt = (e) => {
    setNewDebt((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <form id="formEvent" className="form-event">
        <div className="event-container">
          {" "}
          <button
            type="button"
            className="form-event-close"
            onClick={() => handleModal()}
          >
            X
          </button>
          <InputsFormEvents handleChange={handleChange} isUpdate={isUpdate} />
          <RepetitiveInputs
            deuda={deuda}
            setDeuda={setDeuda}
            handleChange={handleChange}
            setNewDebt={setNewDebt}
            inputs={inputs}
            setInputs={setInputs}
          />
          <div>
            <select name="groups" onChange={(e) => handleChangeGroups(e)}>
              <option selected value="s" disabled={true}>
                Grupos Convocados
              </option>
              {groups.map((group) => {
                return (
                  <option value={group.id} key={group.id}>
                    {group.name}
                  </option>
                );
              })}
            </select>
            {inputs.groups.length > 0 && (
              <div>
                <h4>Has seleccionado estos grupos: </h4>
                <div>
                  {inputs.groups?.map((el) => {
                    return (
                      <div key={el}>
                        <p>{groups.find((gr) => gr.id === el).name} </p>
                        <div id={el} onClick={(e) => deleteGroup(e)}>
                          ✖
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          className="form-event-button-accept"
          onClick={(e) => handleSubmit(e)}
        >
          Aceptar
        </button>
      </form>
    </>
  );
}
