import axios from "axios";

import FOTO from "../../../images/siluetasinfondo.png";

import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase.config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (window.confirm("¿ Está seguro que desea GENERAR un nuevo admin ?")) {
      try {
        const newAdmin = {
          id: userInfoFirestore.uid,
          personal_info: userInfoFirestore,
          permissions: ["not all"],
        };

        await axios.post(`${axios.defaults.baseURL}/admins/create`, newAdmin);

        const washingtonRef = doc(firestore, "usuarios", userInfoFirestore.uid);
        await updateDoc(washingtonRef, {
          isAdmin: true,
        });
        notify("Admin creado con exito!");
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      } catch (error) {
        notifyError(error.response.data.error_DB);
      }
    }
  };

  const handleUpdateDelete = async () => {
    try {
      if (window.confirm("¿ Está seguro que desea ELIMINAR un nuevo admin ?")) {
        await axios.delete(
          `${axios.defaults.baseURL}/admins/delete/${userInfoFirestore.uid}`
        );

        const washingtonRef = doc(firestore, "usuarios", userInfoFirestore.uid);

        await updateDoc(washingtonRef, {
          isAdmin: false,
        });
        notify("Admin eliminado con exito!");
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      }
    } catch (error) {
      notifyError(error.response.data.error);
    }
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
        <button onClick={handleUpdateDelete} className="button-delete">
          Eliminar como admin
        </button>
      ) : (
        <button onClick={handleUpdateAdd} className="button-add">
          Agregar como admin
        </button>
      )}
    </div>
  );
}

export default InfoCard;
