import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../redux/actions/actionsGroup";

import "./UpdateGroup.css";

export default function UpdateGroup({
  id,
  groupDetail,
  update,
  setUpdate,
  setShowDetail,
}) {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const [inputUpdate, setInputUpdate] = useState(groupDetail);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    setInputUpdate(groupDetail);
  }, [groupDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Estas seguro quieres guardar?")) {
      setUpdate(false);
      dispatch(actions.updateGroup(id, inputUpdate));
    }
  };

  const handleChange = (e) => {
    setInputUpdate((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdate = () => {
    if (update) {
      if (window.confirm("Quieres salir de editar?")) setUpdate(!update);
    } else {
      setUpdate(!update);
    }
  };
  const handleSuscribe = async () => {
    //debo hacer la validación de si no es jugador    
    if(!userInfoFirestore.isAdmin){
      let newRoleRequest = { id:userInfoFirestore.uid ,newRole: "Jugador", userInfo:{userInfoFirestore}, groupId : id}
      let response = await dispatch(actions.createNewRoleRequest(newRoleRequest));
      if(response.error){
        alert("Tu solicitud de inscripción ya ha sido enviada, espera a que un admin te acepte :D");
        !update && setRequestSent(true);
      } else  if(response.data){
        !update && setRequestSent(true);
        alert("Solicitud de inscripción enviada");
      }
      else{
        alert ("algo raro pasó")
      }
    }else{
      alert("¿aún no te registras?")
    }
    
  };

  return (
    <div className="update__container">
      <button className="update__button" onClick={() => setShowDetail(false)}>
        Volver
      </button>
      <img className="update__image" src={groupDetail.image} alt="grupos" />
      {update ? <div>Subir</div> : ""}
      {userInfoFirestore.isAdmin ? (
        <button className="update__button" onClick={() => handleUpdate()}>
          {update ? "Cancelar" : "Editar"}
        </button>
      ) : (
        <></>
      )}
      <h1>{groupDetail.name}</h1>

      <span>Genero:</span>
      {update ? (
        <select name="genre" value={inputUpdate.genre} onChange={handleChange}>
          <option value="">Escoge una opción</option>
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Mix">Mixto</option>
        </select>
      ) : (
        <input
          type="text"
          name="genre"
          value={inputUpdate.genre}
          readOnly={update ? false : "readonly"}
          tabIndex={update ? "-1" : "0"}
          onChange={handleChange}
        />
      )}
      <span>Horario: </span>
      <input
        type="text"
        readOnly={update ? false : "readonly"}
        tabIndex={update ? "-1" : "0"}
        name="schedule"
        value={inputUpdate.schedule}
        onChange={handleChange}
      />
      <span>Costo inscripción: </span>
      <input
        type="text"
        value={inputUpdate.inscription_cost}
        name="inscription_cost"
        onChange={handleChange}
        readOnly={update ? false : "readonly"}
        tabIndex={update ? "-1" : "0"}
      />
      <span>Email: </span>
      <input
        type="text"
        value={inputUpdate.contact}
        name="contact"
        onChange={handleChange}
        readOnly={update ? false : "readonly"}
        tabIndex={update ? "-1" : "0"}
      />
      <span>WhatsApp: </span>
      <input
        type="text"
        value={inputUpdate.whatsapp}
        name="whatsapp"
        onChange={handleChange}
        readOnly={update ? false : "readonly"}
        tabIndex={update ? "-1" : "0"}
      />
      <span>Acepta nuevos: </span>
      {update ? (
        <select name="accept_newPlayers" onChange={handleChange}>
          <option value="" selected disabled="true">
            Escoge una opción
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      ) : (
        <input
          type="text"
          value={inputUpdate.accept_newPlayers}
          name="accept_newPlayers"
          onChange={handleChange}
          readOnly={update ? false : "readonly"}
          tabIndex={update ? "-1" : "0"}
        />
      )}
      <span>Admin: </span>
      <input
        type="text"
        value={inputUpdate.adminId}
        name="adminId"
        onChange={handleChange}
        readOnly={update ? false : "readonly"}
        tabIndex={update ? "-1" : "0"}
      />
      <span>Categoria: </span>
      {update ? (
        <select
          name="category"
          value={inputUpdate.category}
          onChange={handleChange}
        >
          <option value="">Escoge una opcion</option>
          <option value="Mixto">Mixto</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Adultos">Adultos</option>
        </select>
      ) : (
        <input
          type="text"
          value={inputUpdate.category}
          name="category"
          onChange={handleChange}
          readOnly={update ? false : "readonly"}
          tabIndex={update ? "-1" : "0"}
        />
      )}
      <div>
        {/* <span>Descripción:</span> */}
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          value={inputUpdate.description}
          readOnly={update ? false : "readonly"}
          tabIndex={update ? "-1" : "0"}
          onChange={handleChange}
        />
        {/* <span>Locación:</span> */}
        <iframe
          title="Ubicación"
          width="300"
          height="200"
          src={groupDetail.location}
        ></iframe>
      </div>
      <button
        className="update__button"
        onClick={update ? (e) => handleSubmit(e) : (e) => handleSuscribe()}
      >
        {update ? "Aceptar" : "Inscribirme"}
      </button>
    </div>
  );
}
