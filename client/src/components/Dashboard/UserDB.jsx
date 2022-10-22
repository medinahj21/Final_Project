import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanRoleRequest,
  getRoleRequests,
} from "../../redux/actions/actionsGroup";
import RoleRequestMiniCard from "./RoleRequestMiniCard";

export default function UserDB() {
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
      <h1>Pruebas DB</h1>
      {requests ? (
        requests.map((req) => {
          return <RoleRequestMiniCard key={req.id} roleRequests={req} />;
        })
      ) : (
        <h3>No hay inscripciones pendientes</h3>
      )}
    </>
  );
}
