import React, { useState, useEffect } from "react";
import FormEvent from "./FormEvent/FormEvent";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/actions/event";

//calendario imports ↓↓↓
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridWeek from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";

export default function Calendario() {
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [objectEvent, setObjectEvent] = useState({ title: "", date: "" });
  const [modalOn, setModalOn] = useState(false);

  const events = useSelector((state) => state.eventReducer.events);

  useEffect(() => {
    let eventMap = events?.map((ev) => [
      {
        title: ev.name,
        date: ev.date.toString(),
      },
    ]);
    setObjectEvent(eventMap.flat());
  }, [events]);

  useEffect(() => {
    console.log(objectEvent);
  }, [objectEvent]);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (modalOn) {
    return (
      <Modal>
        <FormEvent
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          handleModal={handleModal}
        />
      </Modal>
    );
  }

  const modalDetail = (id) => {
    <Modal>
      <h1>Hola</h1>
    </Modal>;
  };

  return (
    <div>
      <h1>Calendario</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridWeek]}
        initialView="dayGridMonth"
        locale={esLocale}
        height={800}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "today prev,next",
        }}
        footerToolbar={{ center: "custom1" }}
        customButtons={{
          custom1: {
            text: "Crear evento",
            click: handleModal,
          },
        }}
        events= {objectEvent}
        eventClick={modalDetail(info)}
      
        
    
    
        
        
      />
    </div>
  );
}
