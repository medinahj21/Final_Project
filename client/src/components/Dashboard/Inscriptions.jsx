import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanRoleRequest,
  getRoleRequests,
} from "../../redux/actions/actionsGroup";
import RoleRequestMiniCard from "./RoleRequestMiniCard";

export default function Inscriptions() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.groupReducer.roleRequests);

  useEffect(() => {
    if (requests?.length === 0) dispatch(getRoleRequests());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(cleanRoleRequest());
    };
  }, [dispatch]);

  return (
    <>
      <h1>Solicitudes</h1>
      {requests ? (
        <div className="table">
          <div className="row blue header">
            <div className="cell">Foto</div>
            <div className="cell">Nombre</div>
            <div className="cell">Grupo</div>
            <div className="cell">Rol</div>
            <div className="cell"></div>
          </div>
          {requests.map((req) => {
            return <RoleRequestMiniCard key={req.id} roleRequests={req} />;
          })}
        </div>
      ) : (
        <h3>No hay inscripciones pendientes</h3>
      )}
    </>
  );
}
