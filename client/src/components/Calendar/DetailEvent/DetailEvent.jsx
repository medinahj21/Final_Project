import React from "react";
import Modal from "../../UI/Modal";
import s from "../DetailEvent/DetailEvent.module.css";

export default function DetailEvent({
  title,
  description,
  setModalDetail,
  location,
}) {
  return (
    <Modal>
      <div className="detail-event-container form__user">
        <header>
          <h1>{title}</h1>
        </header>
        <main>
          <span>Description: {description}</span>
          <span>Ubicación: {location}</span>
        </main>
        <button onClick={() => setModalDetail(false)}>Aceptar</button>
      </div>
    </Modal>
  );
}
