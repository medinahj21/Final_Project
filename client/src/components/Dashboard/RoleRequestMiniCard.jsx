import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoleRequest,
  getGroupDetail,
  getRoleRequests,
} from "../../redux/actions/actionsGroup";
import { createPlayer } from "../../redux/actions/player";

export default function RoleRequestMiniCard(roleRequest) {
  const { id, userInfo, groupId, newRole } = { ...roleRequest.roleRequests };
  const groupDetail = useSelector((state) => state.groupReducer.groupDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupDetail(groupId));
  }, [dispatch]);

  const [newPlayerData, setNewPlayerData] = useState({
    debtValue: 0,
    paymentDay: 0,
    shirtNumber: 0,
  });

  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que desea rechazar esta solicitud?")) {
      await dispatch(deleteRoleRequest(id));
      await dispatch(getRoleRequests());
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
        paymentDay: newPlayerData.paymentDay,
        shirtNumber: newPlayerData.shirtNumber,
        groupId,
      };
      let response = await dispatch(createPlayer(newPlayer));
      if (response.error) {
        alert("algo salió mal");
      } else {
        alert("Nuevo jugador creado");
        await dispatch(deleteRoleRequest(id));
        await dispatch(getRoleRequests());
      }
    }
  };
  console.log("infoooo", roleRequest);
  return (
    <>
      <label>espacio img</label>
      <h5>{userInfo.userInfoFirestore.name}</h5>
      <p>
        {" "}
        {userInfo.userInfoFirestore.name} quiere ser {newRole} en el grupo{" "}
        {groupDetail.name}{" "}
      </p>
      <button onClick={() => handleAccept()}> Aceptar </button>
      <button onClick={() => handleDelete(id)}> Eliminar </button>
      {accepted ? (
        <div>
          <button onClick={() => setAccepted(false)}>cerrar</button>
          <label>
            valor de cuota:
            <input
              type="number"
              name="debtValue"
              onChange={(e) => handleChanges(e)}
              value={newPlayerData.debtValue}
            ></input>
          </label>
          <label>
            fecha de pago:
            <input
              type="number"
              name="paymentDay"
              onChange={(e) => handleChanges(e)}
              value={newPlayerData.paymentDay}
            ></input>
          </label>
          <label>
            número de camisa:
            <input
              type="number"
              name="shirtNumber"
              onChange={(e) => handleChanges(e)}
              value={newPlayerData.shirtNumber}
            ></input>
          </label>
          <button onClick={() => handleConfirm()}>confirmar</button>
        </div>
      ) : (
        <></>
      )}

      <hr />
    </>
  );
}
