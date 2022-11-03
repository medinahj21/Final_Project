import axios from "axios";

import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";

import { notify, notifyError } from "../../../utils/toastify";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase.config";

import { getAllInfoUsers } from "../../../redux/actions/auth";

import "../Request.css";
import "./InfoTable.css";

function InfoRow({ user }) {
  const dispatch = useDispatch();

  const handleUpdateAdd = async () => {
    try {
      if (window.confirm("¿ Está seguro que desea GENERAR un nuevo admin ?")) {
        const newAdmin = {
          id: user.uid,
          personal_info: user,
          permissions: ["all"],
        };

        await axios.post(`${axios.defaults.baseURL}/admins/create`, newAdmin);

        const washingtonRef = doc(firestore, "usuarios", user.uid);
        await updateDoc(washingtonRef, {
          isAdmin: true,
        });

        getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
          const docs = querySnapshot.docs.map((doc) => doc.data());
          dispatch(getAllInfoUsers(docs));
        });

        notify("Permiso de admin añadido");
      }
    } catch (error) {
      notifyError(error.response.data.error_DB);
    }
  };

  const handleUpdateDelete = async () => {
    try {
      if (window.confirm("¿ Está seguro que desea ELIMINAR un nuevo admin ?")) {
        await axios.delete(
          `${axios.defaults.baseURL}/admins/delete/${user.uid}`
        );

        const washingtonRef = doc(firestore, "usuarios", user.uid);

        await updateDoc(washingtonRef, {
          isAdmin: false,
        });

        getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
          const docs = querySnapshot.docs.map((doc) => doc.data());
          dispatch(getAllInfoUsers(docs));
        });

        notify("Permiso de admin removido");
      }
    } catch (error) {
      notifyError(error.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer />{" "}
      <div className="row" key={user.uid}>
        <div className="cell" data-title="image">
          <label>Espacio img</label>
        </div>
        <div className="cell" data-title="name">
          <p>{user.name}</p>
        </div>
        <div className="cell" data-title="email">
          <p>{user.email}</p>
        </div>
        <div className="cell" data-title="actions">
          {" "}
          <div className="form__request-buttons">
            {!user.isAdmin ? (
              <button
                className="form__btn-alta btn__background add-btn"
                onClick={() => handleUpdateAdd()}
              >
                {" "}
                Aceptar{" "}
              </button>
            ) : (
              <button
                className="form__btn-alta btn__background delete-btn"
                onClick={() => handleUpdateDelete()}
              >
                {" "}
                Eliminar{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoRow;
