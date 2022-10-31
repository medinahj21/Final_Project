import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/actionsGroup";
import * as action from "../../../redux/actions/admin";
import UploadImage from "../../UploadImage/UploadImage";
import Modal from "../../UI/Modal";
import InputsCreateForm from "./InputsCreateForm";
import "./FormGroup.css";
import Swal from "sweetalert2";

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
    dispatch(action.getAdmin())
  }, [dispatch])

  const handleChangeAdmin = (e) => {
    let valor = e.target.value;
    if (valor === "") {
      return alert("Este campo no puede ser vacio");
    }
    if (groupInputs.adminId.includes(valor)) {
      return alert("El admin ya fue añadido a la lista");
    }
    setGroupInputs({
      ...groupInputs,
      adminId: [...groupInputs.adminId, e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Estas seguro que quieres guardar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await dispatch(actions.createGroup(groupInputs));
        if (response.error) {
          alert(`algo ha salido mal: ${response.error}`);
        } else {
          Swal.fire(response, '', 'success')
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
        }
      } else if (result.isDenied) {
        Swal.fire('No ha sido creado!', '', 'info')
      }
    })
  };

  const deleteAdminSelected = (id) => {
    setGroupInputs({
      ...groupInputs,
      adminId: [...groupInputs.adminId.filter((e) => e !== id)]
    })
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="form__user form__create-group">
        <UploadImage image={image} setImage={setImage} />
        <InputsCreateForm
          groupInputs={groupInputs}
          handleChange={handleChange}
          admins={admins}
          handleChangeAdmin={handleChangeAdmin}
        />
        <div>
          {groupInputs.adminId?.map((a) => {
            let admin = admins.filter((e) => e.id === a)
            return (
              <div>
                <div>{admin[0].personal_info.name}</div>
                <span onClick={(e) => deleteAdminSelected(a)}>X</span>
              </div>
            )
          })}
        </div>
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
