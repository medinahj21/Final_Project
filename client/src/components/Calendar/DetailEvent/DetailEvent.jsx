import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../UI/Modal";
import Swal from "sweetalert2";
import { Toast } from "../../../utils/toastSweet";
import { deleteEvent, getEvents } from "../../../redux/actions/event";

import './DetailEvent.css'

export default function DetailEvent({ title, description, setModalDetail, location, idE }) {

  const [update, setUpdate] = useState(false)

  const dispatch = useDispatch();

  const handleUpdateEvent = () => {

  }

  const handleDeleteEvent = (idEvent) => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el evento?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#01002E',
      denyButtonText: `No eliminar`,
      target: document.getElementById('detailEvent'),
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          let response = await dispatch(deleteEvent(idEvent));
          if (response.error) {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: `Algo salio mal: ${response.error}`,
              target: document.getElementById('detailEvent')
            })
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Eliminado!',
              text: `Se ha eliminado correctamente!`,
            })
            setModalDetail(false);
            dispatch(getEvents());
          }
        } else if (result.isDenied) {
          Toast.fire({
            icon: 'info',
            title: 'No ha sido eliminado!',
            target: document.getElementById('detailEvent')
          })
        }
      })
  };


  return (
    <Modal >
      <div className="detail-event-container form__user" id="detailEvent">
        <header>
          {update ?
            <span>Nombre: <input type="text" value={title} /></span>
            :
            <h1>{title}</h1>}
        </header>
        <main className="detail-event-content">
          <span>Description:
            {update ?
              <input type="text" value={description} />
              :
              description}</span>
          <span>Ubicación: {
            update ?
              <input type="text" value={location} />
              :
              <iframe title="map" src={location?.split(`\"`)[1]} frameborder="0"></iframe>}</span>
        </main>
        <button className='button-detail-event' onClick={() => update ? handleUpdateEvent() : setModalDetail(false)}>Aceptar</button>
        <button className='button-detail-event' onClick={() => setUpdate(!update)}>{update ? "Cancelar" : "Editar"}</button>
        {!update && <button className='button-detail-event' onClick={() => handleDeleteEvent(idE)}>Eliminar</button>}
      </div>
    </Modal>
  );
}
