import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../redux/actions/actionsGroup";
import * as action from "../../../redux/actions/admin";

import UploadImage from "../../UploadImage/UploadImage";
import Modal from "../../UI/Modal";
import InputsCreateForm from "./InputsCreateForm";

import Swal from "sweetalert2";
import { Toast } from "../../../utils/toastSweet";

import "./FormGroup.css";

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
    adminId: "uiq13LoUZmgKbiHKnyhjTWIieom2",
  });

  const [image, setImage] = useState(null);
  const admins = useSelector((state) => state.adminReducer.admins);

  const handleChange = (e) => {
    setGroupInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        image: image,
      };
    });
  };

  useEffect(() => {
    dispatch(action.getAdmin());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Estas seguro que quieres crear el grupo?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#01002E",
      denyButtonText: `No guardar`,
      target: document.getElementById("formGroups"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await dispatch(actions.createGroup(groupInputs));
        console.log(response);
        if (response.error) {
          Toast.fire({
            icon: "error",
            title: "Error",
            text: `Algo salio mal: ${response.error}`,
            target: document.getElementById("formGroups"),
          });
        } else {
          Toast.fire({
            icon: "success",
            title: "Hecho!",
            text: `Se ha creado correctamente!`,
          });
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
          });
          setImage("");
        }
      } else if (result.isDenied) {
        Toast.fire({
          icon: "info",
          title: "Se ha cancelado la creación!",
          target: document.getElementById("formGroups"),
        });
      }
    });
  };

  return (
    <Modal>
      <form
        id="formGroups"
        onSubmit={handleSubmit}
        className="form__user form__create-group"
      >
        <UploadImage image={image} setImage={setImage} />
        <InputsCreateForm
          groupInputs={groupInputs}
          handleChange={handleChange}
          admins={admins}
        />
        <div className="container-button-group">
          <button type="submit" className="modify__button add-btn">
            Crear
          </button>
          <button
            type="button"
            onClick={() => setIsForm(false)}
            className="modify__button delete-btn"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
