import React, { useState, useEffect, useId } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents } from "../../redux/actions/event";
import { getPlayerDetail } from "../../redux/actions/player";

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

import "./Calendar.css";

export default function Calendar() {
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [objectEvent, setObjectEvent] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const [eventPlayer, setEventPlayer] = useState([]);

  const events = useSelector((state) => state.eventReducer.events);
  const { playerDetail } = useSelector((state) => state.playerReducer);
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  useEffect(() => {
    let eventMap = events?.map((ev) =>
      ev.state === "Pending"
        ? [
          {
            title: ev.name,
            id: ev.id,
            description: ev.description,
            state: ev.state,
            location: ev.location,
            startTime: ev.repetitive ? ev.start : "",
            endTime: ev.repetitive ? ev.end : "",
            start: !ev.repetitive ? `${ev.date[0]} ${ev.start}` : "",
            end: !ev.repetitive ? `${ev.date[0]} ${ev.end}` : "",
            allDay: false,
            daysOfWeek: ev.repetitive ? ev.date[0] : "",
          },
        ]
        : []
    );
    setObjectEvent(eventMap.flat());
  }, [events]);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getPlayerDetail(userInfoFirestore.uid));
    setEventPlayer(playerDetail.events?.map((us) => us.id));
  }, [dispatch]); 

  return (
    <div className="fc-header-toolbar fc-toolbar font-size">
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
        handleWindowResize={true}
        navLinks={true}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "today prev,next",
        }}
        footerToolbar={userInfoFirestore.isAdmin && { center: "custom1" }}
        customButtons={userInfoFirestore.isAdmin && {
          custom1: {
            text: "Crear evento",
            click: handleModal,
          },
        }} //Si no es admin, mostrar los relacionados al jugador
        events={userInfoFirestore.isAdmin ? objectEvent : objectEvent?.filter(ev => eventPlayer?.includes(ev.id))}
        eventClick={function (event) {
          setModalDetail(true);
          setDetail(event.event._def);
        }}
      />

      {modalOn &&
        <Modal>
          <FormEvent
            isCreate={isCreate}
            setIsCreate={setIsCreate}
            handleModal={handleModal}
            getEvents={getEvents}
          />
        </Modal>}

      {modalDetail &&
        <Modal>
          <DetailEvent
            setModalDetail={setModalDetail}
            title={detail.title}
            description={detail.extendedProps.description}
            location={detail.extendedProps.location}
            idE={detail.publicId}
          />
        </Modal>
      }
    </div>
  );
}
