import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase.config";

import { setUserFirestore } from "../../utils/firestore";
import { notify, notifyError } from "../../utils/toastify";
import { validateForm } from "../../utils/validateForm";

import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";

import Modal from "../UI/Modal";

import "./FormUser.css";

function FormUser({ setShowAlta, setIsForm }) {
  const [user, setUser] = useState();

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

  const error = validateForm(userInput);

  const changeHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    validateForm(userInput);
  };

  /* const sendEmail = (e) => {
    e.preventDefault();
    notify();
    emailjs
      .sendForm(
        "service_etq8sc9",
        "template_v29tr0g",
        e.target,
        "HiM3xW9AUxaXgJdP3"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm(userInput);

    if (error !== "") {
      notifyError(error);
      return;
    }

    await setUserFirestore({ ...userInput, uid: user.uid, email: user.email });
    notify("Solicitud enviada");
    setTimeout(() => {
      setShowAlta(false);
    }, 2000);
    window.location.reload(true);
  };

  return (
    <Modal clickHandler={() => setIsForm(false)}>
      <ToastContainer limit={1}/>
      <form onSubmit={handleSubmit} className="form__user">
        <h3 className="form__title">Solicitud de alta</h3>
        <div className="form__content-alta">
          <div className="form__content-inputs">
            <div className="forms_field">
              <input
                value={userInput.name}
                type="text"
                name="name"
                placeholder="Nombre completo"
                className="forms_field-input"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.typeDoc}
                type="text"
                name="typeDoc"
                placeholder="Tipo de documento"
                className="forms_field-input"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.document}
                type="number"
                name="document"
                placeholder="Número de documento"
                className="forms_field-input"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.years}
                type="number"
                name="years"
                placeholder="Edad"
                className="forms_field-input"
                autoFocus
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="form__content-inputs">
            <div className="forms_field">
              <input
                value={userInput.birthDate}
                type="date"
                name="birthDate"
                className="forms_field-input"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.cell}
                type="number"
                name="cell"
                className="forms_field-input"
                placeholder="Número de teléfono"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.bloodType}
                type="text"
                name="bloodType"
                className="forms_field-input"
                placeholder="Tipo de sangre"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.health}
                type="text"
                name="health"
                className="forms_field-input"
                placeholder="Seguro de salud"
                autoFocus
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="form__content-inputs mobile__form-content ">
            <div className="forms_field">
              <input
                value={userInput.specialConditions}
                type="text"
                name="specialConditions"
                className="forms_field-input"
                placeholder="Condiciones especiales"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.emergencyName}
                type="text"
                name="emergencyName"
                className="forms_field-input"
                placeholder="Nombre del contacto de emergencia"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.emergencyRel}
                type="text"
                name="emergencyRel"
                className="forms_field-input"
                placeholder="Parentesco del contacto de emergencia"
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div className="forms_field">
              <input
                value={userInput.emergencyContact}
                type="number"
                name="emergencyContact"
                className="forms_field-input"
                placeholder="Número de emergencia"
                autoFocus
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <button className="form__btn-alta">Enviar</button>
      </form>
    </Modal>
  );
}

export default FormUser;
