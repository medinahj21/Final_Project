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

export default function RoleRequestMiniCard(roleRequest) {
  const { id, userInfo, groupId, newRole } = { ...roleRequest.roleRequests };
  const groupDetail = useSelector((state) => state.groupReducer.groupDetail);

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
      .then((response) => notify("Inscripción aceptada"))
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
      .then((response) => notify("Inscripción rechazada"))
      .catch((error) => console.log(error));
  };

  const handleConfirm = async (e) => {
    if (error) {
      return notifyError(error);
    }

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
        alert("algo salió mal");
        //jugador no creado
      } else {
        sendApprovedEmail(e);
        setTimeout(() => {
          notify("Nuevo jugador creado!!");
        }, 2000);
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
                min="1"
                pattern="^[0-9]+"
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
                min="1"
                pattern="^[0-9]+"
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
