import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

import { setUserFirestore } from "../../utils/firestore";

function FormUser() {
  const navigate = useNavigate();
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

  const changeHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //mando a DB (user+ user.uid(token))
    //guardo UUID de la DB
    setUserFirestore({ ...userInput, uid: user.uid, email: user.email });//sumo UUID 
    
    navigate("/dashboard");
  };

  if (!user || user === "") {
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

export default FormUser;
