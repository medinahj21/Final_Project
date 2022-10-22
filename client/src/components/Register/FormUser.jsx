import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

import { setUserFirestore } from "../../utils/firestore";

// import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./FormUser.css";
import Modal from "../UI/Modal";

function FormUser({ setShowAlta }) {
  // const notifyError = (error) => toast.error(error);
  const notify = () =>
    toast.success("Registro exitoso, vamos a darnos de alta !");

  const [user, setUser] = useState();

  // const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      return;
    }
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSuscribe();
  }, [user]);

  const [userInput, setUserInput] = useState({
    name: "",
    typeDoc: "",
    document: "",
    years: "",
    birthDate: "",
    cell: "",
    emergencyName: "",
    emergencyRel: "",
    emergencyContact: "",
    bloodType: "",
    health: "",
    specialConditions: "",
    uid: "",
    email: "",
  });

  const changeHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("altaaaaaa  ",setShowAlta)
    //setUserFirestore({ ...userInput, uid: user.uid, email: user.email });
    notify();
    setShowAlta(false);
    // notifyError(response.error);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="form__user">
        <ToastContainer />
        <h3 className="form__title">Alta como jugador</h3>
        <label htmlFor="name">
          Nombre:{" "}
          <input
            type="text"
            value={userInput.name}
            name="name"
            id="name"
            placeholder="Your name"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="typeDoc">
          Tipo de documento:{" "}
          <input
            type="text"
            value={userInput.typeDoc}
            name="typeDoc"
            id="typeDoc"
            placeholder="your document type"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="document">
          Documento:{" "}
          <input
            type="number"
            value={userInput.document}
            name="document"
            id="document"
            placeholder="your document"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="years">
          Años:{" "}
          <input
            type="number"
            value={userInput.years}
            name="years"
            id="years"
            placeholder="your years"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="birthDate">
          Fecha de nacimiento:{" "}
          <input
            type="date"
            value={userInput.birthDate}
            name="birthDate"
            id="birthDate"
            placeholder="your birthDate"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="cell">
          Número de teléfono:{" "}
          <input
            type="number"
            value={userInput.cell}
            name="cell"
            id="cell"
            placeholder="your cell"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="emergencyContact">
          Número del contacto de emergencia:{" "}
          <input
            type="number"
            value={userInput.emergencyContact}
            name="emergencyContact"
            id="emergencyContact"
            placeholder="Emergency contact"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="emergencyRel">
          Parentesco del contacto de emergencia:{" "}
          <input
            type="text"
            value={userInput.emergencyRel}
            name="emergencyRel"
            id="emergencyRel"
            placeholder="Emergency relationship"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="emergencyName">
          Nombre del contacto de emergencia:{" "}
          <input
            type="text"
            value={userInput.emergencyName}
            name="emergencyName"
            id="emergencyName"
            placeholder="Emergency name"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="bloodType">
          Tipo de sangre:{" "}
          <input
            type="text"
            value={userInput.bloodType}
            name="bloodType"
            id="bloodType"
            placeholder="bloodType"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="health">
          seguro de salud:{" "}
          <input
            type="text"
            value={userInput.health}
            name="health"
            id="health"
            placeholder="health"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="specialConditions">
          Condiciones especiales de salud:{" "}
          <input
            type="text"
            value={userInput.specialConditions}
            name="specialConditions"
            id="specialConditions"
            placeholder="specialConditions"
            onChange={changeHandler}
          />
        </label>
        <button>Enviar</button>

        <p>
          {/* JSON.stringify({ personalInfo: { ...userInput, uid: user?.uid, email: user?.email } }) */}
        </p>
      </form>
    </Modal>
  );
}

export default FormUser;
