import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents } from "../../redux/actions/event";

import Modal from "../UI/Modal";
import FormEvent from "./FormEvent/FormEvent";
//calendario imports ↓↓↓
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridWeek from "@fullcalendar/timegrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import DetailEvent from "./DetailEvent/DetailEvent";

export default function Calendario() {
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [objectEvent, setObjectEvent] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [detail, setDetail] = useState([]);

  const events = useSelector((state) => state.eventReducer.events);


  useEffect(() => {
    let eventMap = events?.map((ev) => ev.state === 'Pending' ? [
      {
        title: ev.name,
        id: ev.id,
        description: ev.description,
        state: ev.state,
        location: ev.location,
        start: `${ev.date} ${ev.start}`,
        end: `${ev.date} ${ev.end}`,
        allDay: false
      },
    ] : []);
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
          getEvents={getEvents}
        />
      </Modal>
    );
  }

  if (modalDetail) {
    return (
      <Modal>
        <DetailEvent
          setModalDetail={setModalDetail}
          title={detail.title}
          description={detail.extendedProps.description}
          location={detail.extendedProps.location}
        />
      </Modal>
    );
  }

  return (
    <div>
      <h1>Calendario</h1>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridWeek,
          timeGridPlugin,
        ]}
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
        events={objectEvent}
        eventClick={function (event) {
          setModalDetail(true);
          setDetail(event.event._def);
        }}
      />
    </div>
  );
}
