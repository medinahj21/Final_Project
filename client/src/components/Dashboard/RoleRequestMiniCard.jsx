import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

import { ToastContainer } from "react-toastify";
import { notify, notifyError, notifyInfo } from "../../utils/toastify";

import {
  deleteRoleRequest,
  getGroupDetail,
  getRoleRequests,
} from "../../redux/actions/actionsGroup";

import { createPlayer } from "../../redux/actions/player";
import Modal from "../UI/Modal";

import "./Request.css";
import "./FormRequest.css";
import { validateNewPlayer } from "../../utils/validateNewPlayer";
import axios from "axios";

export default function RoleRequestMiniCard(roleRequest) {
  const { id, userInfo, groupId, newRole } = { ...roleRequest.roleRequests };
  const groupDetail = useSelector((state) => state.groupReducer.groupDetail);
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupDetail(groupId));
  }, [dispatch]);

  const [newPlayerData, setNewPlayerData] = useState({
    debtValue: "",
    paymentDate: "",
    shirtNumber: "",
  });

  const [accepted, setAccepted] = useState(false);
  const error = validateNewPlayer(newPlayerData);

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que desea rechazar esta solicitud?")) {
      await dispatch(deleteRoleRequest(id));
      await dispatch(getRoleRequests());
      notify("Solicitud rechazada");
      sendRejectedEmail();
    } else {
      notifyInfo("Luego decides !");
    }
  };

  const handleChanges = (e) => {
    setNewPlayerData({
      ...newPlayerData,
      [e.target.name]: e.target.value,
    });
    validateNewPlayer(newPlayerData);
  };

  const templateParams = {
    name: userInfo.userInfoFirestore.name,
    group: groupDetail.name,
    email: userInfo.userInfoFirestore.email,
    paymentDate: newPlayerData.paymentDate,
    debtValue: newPlayerData.debtValue,
    shirtNumber: newPlayerData.shirtNumber,
  };

  const sendApprovedEmail = (e) => {
    e.preventDefault();
    notify();
    emailjs
      .send(
        "service_etq8sc9",
        "template_qrytb8s",
        templateParams,
        "HiM3xW9AUxaXgJdP3"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const sendRejectedEmail = () => {
    notify();
    emailjs
      .send(
        "service_egxx8pm",
        "template_5tavzze",
        templateParams,
        "epAfsbl4mjKLiu-3p"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleConfirm = async (e) => {
    if (window.confirm("¿seguro que desea confirmar esta inscripción?")) {
      let newPlayer = {
        id,
        personalInfo: userInfo.userInfoFirestore,
        debtValue: newPlayerData.debtValue,
        paymentDate: newPlayerData.paymentDate,
        shirtNumber: newPlayerData.shirtNumber,
        groupId,
      };
      let response = await dispatch(createPlayer(newPlayer));
      if (response.error) {
        notifyError("Algo salio mal!");
        //jugador no creado
      } else {
        notify("Nuevo jugador creado");
        // -------------- genero órdenes de inscripción y mensualidad -----------
        const month = () => {
          var options = { month: "long" };
          let day = new Date();
          day.setDate(day.getDate() + 30);
          let monthName = day.toLocaleDateString("es-CO", options).split("/");
          return monthName;
        };
        const paymentDate = (term) => {
          var options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const day = new Date();
          day.setDate(day.getDate() + Number(term));
          const array = day.toLocaleDateString("es-US", options).split("/");
          const formatedDate = [array[2], array[1], array[0]].join("-");
          return formatedDate;
        };
        let newOrders = [
          //inscripción
          {
            value: groupDetail.inscription_cost,
            concept: "Inscripción",
            description: `Deuda por inscripción a ${groupDetail.name.toLowerCase()}`,
            order_state: "Pending",
            payment_mode: "App",
            payment_term: 8, //hardcodeado, dependerá de cada caso
            type_order: "club",
            playerId: id,
          },
          //primera mensualidad
          {
            value: newPlayerData.debtValue,
            concept: `Mensualidad-${month()}`,
            description: `Cobro mensualidad-${month()}`,
            order_state: "Pending",
            payment_mode: "App",
            payment_term: 1, //hardcodeado, dependerá de cada caso
            type_order: "club",
            playerId: id,
          },
        ];

        newOrders.forEach(async (order) => {
          await axios.post(`${axios.defaults.baseURL}/orders/create`, order);
        });
        notify("Órdenes creadas");

        // --------- genero eventos pago de inscripción y mensualidad -----------

        try {
          let newEvents = [
            // evento pago inscripción
            {
              name: `pago de inscripción`,
              location:
                "Puedes realizar el pago en el dashboard componente de perfil",
              start: "00:00:00",
              end: "23:59:59",
              date: [paymentDate(8)],
              description: `Fecha máxima de pago de inscripción ${paymentDate(8)}`,
              repetitive: false,
              state: "Pending",
              player: id,
            }
              ,
            // evento pago primera mensualidad
            {
              name: `Pago mensualidad-${month()}`,
              location:
                "Puedes realizar el pago en el dashboard componente de perfil",
              start: "00:00:00",
              end: "23:59:59",
              date: [paymentDate(30)],//acomodar con respecto al day asignado
              description: `Fecha máxima de pago de inscripción ${paymentDate(8)}`,
              repetitive: true,
              state: "Pending",
              player: id,
            }
          ];

          newEvents.forEach(async (event) => {
            await axios.post(`${axios.defaults.baseURL}/events/create`, event);
          });
          notify("Eventos creados");
        } catch (error) {
          notifyError("No se generaron los eventos");
          console.log({ error_events: error });
        }
        
        
        // -------------- envió emailconfirmación y borro datos -----------------
        
        sendApprovedEmail(e);
        await dispatch(deleteRoleRequest(id));
        await dispatch(getRoleRequests());
      }
    } else {
      notifyInfo("Luego decides !");
    }
    //no quiero confirmar
  };
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="cell" data-title="image">
          <label>espacio img</label>
        </div>
        <div className="cell" data-title="name">
          <p>{userInfo.userInfoFirestore.name}</p>
        </div>
        <div className="cell" data-title="group">
          {groupDetail.name}
        </div>
        <div className="cell" data-title="role">
          {newRole}
        </div>
        <div className="cell" data-title="actions">
          {" "}
          <div className="form__request-buttons">
            <button
              className="form__btn-alta btn__background add-btn"
              onClick={() => handleAccept()}
            >
              {" "}
              Aceptar{" "}
            </button>
            <button
              className="form__btn-alta btn__background delete-btn"
              onClick={() => handleDelete(id)}
            >
              {" "}
              Eliminar{" "}
            </button>
          </div>
        </div>
      </div>
      {accepted ? (
        <Modal>
          <ToastContainer />

          <div className="form__content-request form__request">
            <div className="forms_field-request">
              <input
                className="forms_field-request-input"
                type="number"
                name="debtValue"
                placeholder="Valor de cuota"
                onChange={(e) => handleChanges(e)}
                value={newPlayerData.debtValue}
              />
            </div>
            <div className="forms_field-request">
              <input
                className="forms_field-request-input"
                type="number"
                name="paymentDate"
                placeholder="fecha de pago"
                onChange={(e) => handleChanges(e)}
                value={newPlayerData.paymentDate}
              />
            </div>
            <div className="forms_field-request">
              <input
                className="forms_field-request-input"
                type="number"
                name="shirtNumber"
                placeholder="Número de camisa"
                onChange={(e) => handleChanges(e)}
                value={newPlayerData.shirtNumber}
              />
            </div>
            <div className="form__request-buttons">
              <button
                className="form__btn-alta"
                onClick={(e) => handleConfirm(e)}
              >
                confirmar
              </button>
              <button
                className="form__btn-alta"
                onClick={() => setAccepted(false)}
              >
                cerrar
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
      <hr />
    </>
  );
}
