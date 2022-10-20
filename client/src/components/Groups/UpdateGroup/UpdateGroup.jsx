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
  const handleSuscribe = () => {
    console.log("suscribe");
  };

  return (
    <div className="update__container">
      <button onClick={() => setShowDetail(false)}>Volver</button>
      <div className={""}>
        <img className="update__image" src={groupDetail.image} alt="grupos" />
        {update ? <div>Subir</div> : ""}
      </div>
      <section>
        {userInfoFirestore.isAdmin ? (
          <div onClick={() => handleUpdate()}>
            {update ? "Cancelar" : "Editar"}
          </div>
        ) : (
          <></>
        )}
        <h1>{groupDetail.name}</h1>

        <div>
          <div>
            <div>
              <span>Genero:</span>
              {update ? (
                <select
                  name="genre"
                  value={inputUpdate.genre}
                  onChange={handleChange}
                >
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
            </div>
            <div>
              <span>Horario: </span>
              <input
                type="text"
                readOnly={update ? false : "readonly"}
                tabIndex={update ? "-1" : "0"}
                name="schedule"
                value={inputUpdate.schedule}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Costo inscripción: </span>
              <input
                type="text"
                value={inputUpdate.inscription_cost}
                name="inscription_cost"
                onChange={handleChange}
                readOnly={update ? false : "readonly"}
                tabIndex={update ? "-1" : "0"}
              />
            </div>
            <div>
              <span>Email: </span>
              <input
                type="text"
                value={inputUpdate.contact}
                name="contact"
                onChange={handleChange}
                readOnly={update ? false : "readonly"}
                tabIndex={update ? "-1" : "0"}
              />
            </div>
            <div>
              <span>WhatsApp: </span>
              <input
                type="text"
                value={inputUpdate.whatsapp}
                name="whatsapp"
                onChange={handleChange}
                readOnly={update ? false : "readonly"}
                tabIndex={update ? "-1" : "0"}
              />
            </div>
            <div>
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
            </div>
            <div>
              <span>Admin: </span>
              <input
                type="text"
                value={inputUpdate.adminId}
                name="adminId"
                onChange={handleChange}
                readOnly={update ? false : "readonly"}
                tabIndex={update ? "-1" : "0"}
              />
            </div>
            <div>
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
            </div>
          </div>
          <div>
            <div>
              <span>Descripción:</span>
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
            </div>
            <div>
              <span>Locación:</span>
              <iframe
                title="Ubicación"
                width="300"
                height="200"
                src={groupDetail.location}
              ></iframe>
            </div>
          </div>
        </div>
        <button
          onClick={update ? (e) => handleSubmit(e) : (e) => handleSuscribe()}
        >
          {update ? "Aceptar" : "Inscribirme"}
        </button>
      </section>
    </div>
  );
}
