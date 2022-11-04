import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getGroupDetail,
  getGroups,
  updateGroup,
} from "../../../redux/actions/actionsGroup";
import Modal from "../../UI/Modal";
import Swal from "sweetalert2";
import { Toast } from "../../../utils/toastSweet";
import "./UpdateGroup.css";

function UpdateGroup({ setIsEdit, groupDetail, id }) {
  // const admins = useSelector((state) => state.adminReducer.admins);
  const [inputUpdate, setInputUpdate] = useState(groupDetail);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    Toast.fire({
      title: '¿Guardar los cambios?',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#01002E',
      denyButtonText: `No guardar`,
      timerProgressBar: false,
      target: document.getElementById('detail'),
      width: "300px"
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          let response = await dispatch(updateGroup(id, inputUpdate));
          if (response.error) {
            Toast.fire({
              icon: 'error',
              title: 'Error',
              text: `Algo salio mal: ${response.error}`,
              target: document.getElementById('detail'),
              
            })
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Hecho!',
              text: `Se ha guardado correctamente!`,
              target: document.getElementById('detail')
            })
            setTimeout(() => {
              dispatch(getGroupDetail(id));
              dispatch(getGroups());
            }, 2000);
          }
        } else if (result.isDenied) {
          Toast.fire({
            icon: 'info',
            title: 'Se ha cancelado la edición!',
            target: document.getElementById('detail')
          })
        }
      })
  };

  const handleChange = (e) => {
    setInputUpdate((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const editHandler = () => {
    setIsEdit(false);
  };

  return (
    <Modal clickHandler={editHandler} >
      <div className="form__user form-update-group" id="detail">
        <h2>Editar</h2>
        <div className="update-section">
          <select
            name="accept_newPlayers"
            defaultValue="news"
            onChange={handleChange}
          >
            <option value="news" disabled="true">
              ¿ Acepta nuevos ?
            </option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
          <span>Admin: </span>
          <input
            type="text"
            value={inputUpdate.adminId}
            name="adminId"
            onChange={handleChange}
          />
          <span>Categoria: </span>
          <input
            type="text"
            value={inputUpdate.category}
            name="category"
            onChange={handleChange}
          />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            value={inputUpdate.description}
            onChange={handleChange}
          />
        </div>
        <div className="update-section">
          <select name="genre" defaultValue="genre" onChange={handleChange}>
            <option value="genre" disabled="true">
              Elige un género
            </option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Mix">Mixto</option>
          </select>
          <span>Horario: </span>
          <input
            type="text"
            name="schedule"
            value={inputUpdate.schedule}
            onChange={handleChange}
          />
          <span>Costo inscripción: </span>
          <input
            type="text"
            value={inputUpdate.inscription_cost}
            name="inscription_cost"
            onChange={handleChange}
          />
          <span>Email: </span>
          <input
            type="text"
            value={inputUpdate.contact}
            name="contact"
            onChange={handleChange}
          />
          <span>WhatsApp: </span>
          <input
            type="text"
            value={inputUpdate.whatsapp}
            name="whatsapp"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Aceptar</button>
        </div>

        {/* <iframe
            title="Ubicación"
            width="300"
            height="200"
            src={groupDetail.location}
          ></iframe> */}
      </div>
    </Modal>
  );
}

export default UpdateGroup;
