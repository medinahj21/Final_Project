import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../../redux/actions/actionsGroup";
import UploadImage from "../../UploadImage/UploadImage";
import Modal from "../../UI/Modal";
import InputsCreateForm from "./InputsCreateForm";

import './FormGroup.css'

export default function FormGroup({ setIsForm }) {
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
    console.log(response);

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
    <Modal>
      <form onSubmit={handleSubmit} className="form__create-group">
        <button type="button" onClick={() => setIsForm(false)}>
          X
        </button>
        <UploadImage image={image} setImage={setImage} />
        <InputsCreateForm
          groupInputs={groupInputs}
          handleChange={handleChange}
        />
        <button type="submit">Crear</button>
      </form>
    </Modal>
  );
}
