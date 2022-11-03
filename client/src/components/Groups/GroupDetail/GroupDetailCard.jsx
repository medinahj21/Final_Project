import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Toast } from "../../../utils/toastSweet";
import * as actions from "../../../redux/actions/actionsGroup";
import FormUser from "../../Register/FormUser";
import UpdateGroup from "../UpdateGroup/UpdateGroup";

import "./GroupDetailCard.css";

export default function GroupDetailCard({
  id,
  groupDetail,
  setShowDetail,
  allowBack,
}) {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const { playerDetail } = useSelector((state) => state.playerReducer);
  const { roleRequests } = useSelector((state) => state.groupReducer);

  const [isForm, setIsForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    dispatch(actions.getRoleRequests())
  }, [dispatch])

  useEffect(() => {
    if (!userInfoFirestore.isAdmin) {
      const didRequest = roleRequests?.filter((role) => (role.id === userInfoFirestore.uid) && (role.deletedAt === null))
      if (didRequest.length) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [roleRequests])

  const handleSuscribe = async () => {
    //debo hacer la validación de si no es jugador
    if (!userInfoFirestore.isAdmin) {
      let newRoleRequest = {
        id: userInfoFirestore.uid,
        newRole: "Jugador",
        userInfo: { userInfoFirestore },
        groupId: id,
      };
      let response = await dispatch(
        actions.createNewRoleRequest(newRoleRequest)
      );
      if (response.error) {
        alert(
          "Tu solicitud de inscripción ya ha sido enviada, espera a que un admin te acepte :D"
        );
      } /* if(response.data) */ else {
        alert("Solicitud de inscripción enviada");
        setIsDisabled(true);
      }
      /* else{
        alert ("algo raro pasó")
      } */
    } else {
      alert("¿aún no te registras?");
    }
  };

  const deleteGroup = (id) => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el grupo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#01002E',
      denyButtonText: `No Eliminar`,
      target: document.getElementById('container-group-detail')
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          let response = await dispatch(actions.deleteGroup(id))
          if (response.error) {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: `Algo salio mal: ${response.error}`,
              target: document.getElementById('container-group-detail')
            })
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Hecho!',
              text: `Se ha eliminado correctamente!`,
            })
            dispatch(actions.getGroups());
            setShowDetail(false)
          }
        } else if (result.isDenied) {
          Toast.fire({
            icon: 'info',
            title: 'La eliminación se ha cancelado!',
            target: document.getElementById('container-group-detail')
          })
        }
      })
  }


  return (
    <div >
      <img className="update__image" src={groupDetail.image} alt="grupos" />
      <div className="group__detail-container">
        <p>
          <span>{groupDetail.name}</span>
        </p>
        <div className="group-detail-content">
          <div className="group-detail-first">
            <span>Genero: </span>
            <p>{groupDetail.genre}</p>
            <span>Categoria: </span>
            <p>{groupDetail.category}</p>
            <span>Descripción: </span>
            <p>{groupDetail.description}</p>
          </div>
          <div className="group-detail-second">
            <span>Horario: </span>
            <p>{groupDetail.schedule}</p>
            <span>Costo de inscripción: </span>
            <p>{groupDetail.inscription_cost}</p>
            <span>Correo electrónico: </span>
            <p>{groupDetail.contact}</p>
            <span>Whatsapp: </span>
            <p>{groupDetail.whatsapp}</p>
            <span>Acepta jugadores: </span>
            <p>{groupDetail.accept_newPlayers ? "Si" : "No"}</p>
          </div>
        </div>
        <div className="group-btn-container">
          {!userInfoFirestore?.uid && (
            <div
              className="button-detail-group"
              onClick={() => setIsForm(true)}
            >
              {" "}
              <a href="#!" className="animated-button victoria-one">
                Solicitar alta
              </a>{" "}
            </div>
          )}
          {!isDisabled &&
            userInfoFirestore?.uid &&
            !userInfoFirestore?.isAdmin &&
            !playerDetail.id && (
              <div
                className="button-detail-group"
                onClick={(e) => handleSuscribe()}
              >
                {" "}
                <a href="#!" className="animated-button victoria-one">
                  Inscribirme
                </a>{" "}
              </div>
            )}{" "}
          {userInfoFirestore?.isAdmin && (
            <>
              <div
                className="button-detail-group"
                onClick={() => setIsEdit(true)}
              >
                {" "}
                <a href="#!" className="animated-button victoria-one">
                  Editar
                </a>{" "}
              </div>
              <div
                className="button-detail-group"
                onClick={() => deleteGroup(id)}
              >
                {" "}
                <a href="#!" className="animated-button victoria-one">
                  Eliminar
                </a>{" "}
              </div>
            </>
          )}{" "}
          {(!playerDetail.id || allowBack) && (
            <div
              className="button-detail-group"
              onClick={() => setShowDetail(false)}
            >
              {" "}
              <a href="#!" className="animated-button victoria-one">
                Volver
              </a>{" "}
            </div>
          )}
        </div>
        <iframe title="Ubicación" src={groupDetail.location?.split('\"')[1]}></iframe>
        {isEdit ? (
          <UpdateGroup
            setIsEdit={setIsEdit}
            groupDetail={groupDetail}
            id={id}
          />
        ) : (
          <></>
        )}
        {isForm ? <FormUser setIsForm={setIsForm} /> : <></>}
      </div>
    </div>
  );
}
