import React, { useState } from "react";
import Modal from "../../UI/Modal";
import s from "../DetailEvent/DetailEvent.module.css";

export default function DetailEvent({ title, description, setModalDetail, location, }) {

  const [update, setUpdate] = useState(false)


  return (
    <Modal>
      <div className="detail-event-container form__user">
        <header>
          {update ?
            <span>Nombre: <input type="text" value={title} /></span>
            :
            <h1>{title}</h1>}
        </header>
        <main>
          <span>Description:
            {update ?
              <input type="text" value={description} />
              :
              description}</span>
          <span>Ubicación: {
            update ?
              <input type="text" value={location} />
              :
              <iframe src={location?.split('\"')[1]} frameborder="0"></iframe> }</span>
        </main>
        <button onClick={() => setModalDetail(false)}>Aceptar</button>
        <button onClick={() => setUpdate(!update)}>{update ? "Cancelar" : "Editar"}</button>
        {!update && <button onClick={() => ""(false)}>Eliminar</button>}
      </div>
    </Modal>
  );
}
