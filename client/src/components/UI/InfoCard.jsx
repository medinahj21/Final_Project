import React from "react";

import axios from "axios";

import FOTO from "../../images/siluetasinfondo.png";
import { doc, updateDoc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { firestore } from "../../firebase/firebase.config";
import "./InfoCard.css";

function InfoCard({ userInfoFirestore }) {
  const notifyError = (error) =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true,
    });

  const notify = (message) =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const handleUpdateAdd = async () => {
    if (window.confirm("¿ Está seguro que desea generar un nuevo admin ?")) {
      try {
        const newAdmin = {
          id: userInfoFirestore.uid,
          personal_info: userInfoFirestore,
          permissions: ["all"],
        };

        let response = await axios.post(
          `${axios.defaults.baseURL}/admins/create`,
          newAdmin
        );

        const washingtonRef = doc(firestore, "usuarios", userInfoFirestore.uid);
        await updateDoc(washingtonRef, {
          isAdmin: true,
        });
        notify("Admin creado con exito!");
      } catch (error) {
        notifyError(error.response.data.error_DB);
        console.log("infocardfornt", error.response.data.error_DB);
      }
    }
  };

  const handleUpdateDelete = async () => {
    const washingtonRef = doc(firestore, "usuarios", userInfoFirestore.uid);

    await updateDoc(washingtonRef, {
      isAdmin: false,
    });
  };

  return (
    <div className="card__info">
      <ToastContainer />
      <img className={"card__image"} src={FOTO} alt="" />
      <h2>{userInfoFirestore.name}</h2>
      <p>Edad: {userInfoFirestore.years}</p>
      <p>Fecha de nacimiento: {userInfoFirestore.birthDate}</p>
      <p>Tipo de sangre: {userInfoFirestore.bloodType}</p>
      <p>Número de teléfono: {userInfoFirestore.cell}</p>
      <p>Tipo de documento: {userInfoFirestore.typeDoc}</p>
      <p>Documento: {userInfoFirestore.document}</p>
      <p>Email: {userInfoFirestore.email}</p>
      <h3>Contacto de emergencia: {userInfoFirestore.emergencyName}</h3>
      <p>Número de teléfono: {userInfoFirestore.emergencyContact}</p>
      <p>Parentesco: {userInfoFirestore.emergencyRel}</p>
      <p>Seguro de salud: {userInfoFirestore.health}</p>
      {userInfoFirestore.isAdmin ? (
        <button onClick={handleUpdateDelete}>Eliminar como admin</button>
      ) : (
        <button onClick={handleUpdateAdd}>Agregar como admin</button>
      )}
    </div>
  );
}

export default InfoCard;
