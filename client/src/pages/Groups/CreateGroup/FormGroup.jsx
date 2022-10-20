import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./FormGroup.module.css";
import * as actions from "../../../redux/actions/actionsGroup";
import UploadImage from "../../../components/UploadImage/UploadImage";

export default function FormGroup() {
  const dispatch = useDispatch();

  const [groupInputs, setGroupInputs] = useState({
    name: "",
    location: "",
    schedule: "",
    description: "",
    image: "",
    inscription_cost: "",
    contact: "",
    whatsapp: "",
    accept_newPlayers: "",
    genre: "",
    adminId: [],
  });
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setGroupInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        image: image,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await dispatch(actions.createGroup(groupInputs));
    console.log(response)

    if (response.error) {
      alert(`algo ha salido mal: ${response.error}`);
    } else {
      await dispatch(actions.getGroups());
      setGroupInputs({
        name: "",
        location: "",
        schedule: "",
        description: "",
        image: "",
        inscription_cost: "",
        contact: "",
        whatsapp: "",
        accept_newPlayers: "",
        genre: "",
        adminId: [],
      });
      setImage("");
      alert("Product has been created successfully");
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <UploadImage image={image} setImage={setImage} />
      <label htmlFor="name">
        Nombre: <input type="text" name="name" value={groupInputs.name} onChange={handleChange} />
      </label>
      <label htmlFor="location">
        Locación: <input type="text" name="location" value={groupInputs.location} onChange={handleChange} />
      </label>
      <label htmlFor="schedule">
        Horario: <input type="text" name="schedule" value={groupInputs.schedule} onChange={handleChange} />
      </label>
      <label htmlFor="description">
        Descripción: <textarea name="description" value={groupInputs.description} onChange={handleChange} />
      </label>
      <label htmlFor="inscription_cost">
        Costo de inscripción:{" "}
        <input type="number" name="inscription_cost" value={groupInputs.inscription_cost} onChange={handleChange} />
      </label>
      <label htmlFor="contact">
        Contacto: <input type="text" name="contact" value={groupInputs.contact} onChange={handleChange} />
      </label>
      <label htmlFor="whatsappGroup">
        Grupo de WhatsApp:{" "}
        <input type="text" name="whatsapp" value={groupInputs.whatsapp} onChange={handleChange} />
      </label>
      <label htmlFor="accept_newPlayers">
        Acepta nuevos:{" "}
        <select name="accept_newPlayers" id="" value={groupInputs.accept_newPlayers} onChange={handleChange}>
          <option selected disabled="true">
            Escoga una opción
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      <label htmlFor="category">
        Categoria:{" "}
        <select name="category"  onChange={handleChange}>
          <option selected disabled="true">
            Escoge una opcion
          </option>
          <option value="Mixto">Mixto</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Adultos">Adultos</option>
        </select>
      </label>
      <label htmlFor="genre">
        Genero:{" "}
        <input
          type="radio"
          name="genre"
          value="Female"
          onChange={handleChange}
        />
        Femenino
        <input type="radio" name="genre" value="Male" onChange={handleChange} />
        Masculino
        <input type="radio" name="genre" value="Mix" onChange={handleChange} />
        Mixto
      </label>
      <label htmlFor="adminId">
        AdminID: <input type="text" name="adminId" onChange={handleChange} />
      </label>
      <button type="submit">Crear</button>
    </form>
  );
}
