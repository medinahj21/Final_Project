import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePlayer } from '../../../redux/actions/player';
import Swal from "sweetalert2";
import { Toast } from "../../../utils/toastSweet";
import { getPlayersFromDB } from '../../../redux/actions/player'

export default function InfoPlayerRow({ player }) {

    const dispatch = useDispatch();

    const handleUpdateDelete = (id) => {
        Swal.fire({
            title: 'Estas seguro que quieres eliminar al jugador?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#01002E',
            denyButtonText: `No Eliminar`,
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let response = dispatch(deletePlayer(id))
                    console.log(response);
                    if (response.error) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `Algo salio mal: ${response.error}`,
                        })
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: 'Hecho!',
                            text: `Se ha creado correctamente!`,
                        })
                        dispatch(getPlayersFromDB())
                    }
                } else if (result.isDenied) {
                    Toast.fire({
                        icon: 'info',
                        title: 'No ha sido creado!',
                        target: document.getElementById('formEvent')
                    })
                }
            })
    }

    return (
        <div className="row" key={''}>
            <div className="cell" data-title="image">
                <label>espacio img</label>
            </div>
            <div className="cell" data-title="name">
                <p>{player.personalInfo.name}</p>
            </div>
            <div className="cell" data-title="email">
                <p>{player.personalInfo.email}</p>
            </div>
            <div className="cell" data-title="actions">
                {" "}
                <div className="form__request-buttons">
                    <button
                        className="form__btn-alta btn__background delete-btn"
                        onClick={() => handleUpdateDelete(player.id)}>
                        {" "}
                        Eliminar{" "}
                    </button>
                </div>
            </div>
        </div>

    )
}
