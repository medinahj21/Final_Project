import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanGroupDetail,
  cleanRoleRequest,
  getRoleRequests,
} from "../../redux/actions/actionsGroup";
import { getPlayersFromDB } from "../../redux/actions/player";
import RoleRequestMiniCard from "./RoleRequestMiniCard";

export default function UserDB() {
  const dispatch = useDispatch();
  /*  const players = useSelector((state) => state.playerReducer.playersDB); */
  const requests = useSelector((state) => state.groupReducer.roleRequests);

  useEffect(() => {
    //dispatch(cleanGroupDetail());
    /* if (players?.length === 0) dispatch(getPlayersFromDB()); */
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
