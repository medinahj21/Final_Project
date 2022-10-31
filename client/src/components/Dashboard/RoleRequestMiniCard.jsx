import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleAccept = () => {
    setAccepted(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que desea rechazar esta solicitud?")) {
      await dispatch(deleteRoleRequest(id));
      await dispatch(getRoleRequests());
      notify("Solicitud rechazada");
    } else {
      notifyInfo("Luego decides !");
    }
  };

  const handleChanges = (e) => {
    setNewPlayerData({
      ...newPlayerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = async () => {
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
                onClick={() => handleConfirm()}
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
