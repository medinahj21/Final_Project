import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import s from '../UpdateGroup/UpdateGroup.module.css'
import * as actions from '../../../redux/actions/actionsGroup';


export default function UpdateGroup({ id, groupDetail, update, setUpdate }) {
    const dispatch = useDispatch();

    const [inputUpdate, setInputUpdate] = useState(groupDetail);

    useEffect(() => {
        setInputUpdate(groupDetail)
    }, [groupDetail])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('Estas seguro quieres guardar?')) {
            setUpdate(false)
            dispatch(actions.updateGroup(id, inputUpdate))
        }
    }
    const handleChange = (e) => {
        setInputUpdate((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleUpdate = () => {
        if (update) {
            if (window.confirm('Quieres salir de editar?')) setUpdate(!update)
        } else {
            setUpdate(!update)
        }
    }
    const handleSuscribe = () => {
        console.log('suscribe');
    }

    return (
        <div className={s.containerDetail}>
            <section className={''}>
                <img src={groupDetail.image} className={s.image} alt="grupos" />
                {update ? <div>Subir</div> : ''}
            </section>
            <section className={s.containerItems}>
                <div className={s.buttonEdit} onClick={() => handleUpdate()}>{update ? 'Cancelar' : 'Editar'}</div>
                <h1>{groupDetail.name}</h1>

                <div className={s.items}>
                    <div className={s.smallInputs}>
                        <div className={s.subItems}>
                            <span>Genero:</span>
                            {update ?
                                <select name='genre' value={inputUpdate.genre} onChange={handleChange}>
                                    <option value="" >Escoge una opción</option>
                                    <option value="Male">Masculino</option>
                                    <option value="Female">Femenino</option>
                                    <option value="Mix">Mixto</option>
                                </select>
                                :
                                <input type="text" name='genre' value={inputUpdate.genre} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} onChange={handleChange} />
                            }
                        </div>
                        <div className={s.subItems}>
                            <span>Horario: </span>
                            <input type="text" readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} name="schedule" value={inputUpdate.schedule} onChange={handleChange} />
                        </div>
                        <div className={s.subItems}>
                            <span>Costo inscripción: </span>
                            <input type="text" value={inputUpdate.inscription_cost} name="inscription_cost" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} />
                        </div>
                        <div className={s.subItems}>
                            <span>Email: </span>
                            <input type="text" value={inputUpdate.contact} name="contact" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} />
                        </div>
                        <div className={s.subItems}>
                            <span>WhatsApp: </span>
                            <input type="text" value={inputUpdate.whatsapp} name="whatsapp" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} />
                        </div>
                        <div className={s.subItems}>
                            <span>Acepta nuevos: </span>
                            {update ?
                                <select name="accept_newPlayers" onChange={handleChange}>
                                    <option value="" selected disabled='true'>Escoge una opción</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                                :
                                <input type="text" value={inputUpdate.accept_newPlayers} name="accept_newPlayers" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} />
                            }
                        </div>
                        <div className={s.subItems}>
                            <span>Admin: </span>
                            <input type="text" value={inputUpdate.adminId} name="adminId" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} />
                        </div>
                        <div className={s.subItems}>
                            <span>Categoria: </span>
                            {update ?
                                <select name="category" value={inputUpdate.category} onChange={handleChange}>
                                    <option value="">Escoge una opcion</option>
                                    <option value="Mixto">Mixto</option>
                                    <option value="Juvenil">Juvenil</option>
                                    <option value="Adultos">Adultos</option>
                                </select> :
                                <input type="text" value={inputUpdate.category} name="category" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} />
                            }
                        </div>
                    </div>
                    <div className={s.largeInputs}>
                        <div className={s.subItems}>
                            <span>Descripción:</span>
                            <textarea name="description" id="" cols="30" rows="10" value={inputUpdate.description} readOnly={update ? false : 'readonly'} tabIndex={update ? "-1" : "0"} onChange={handleChange} />
                        </div>
                        <div className={s.subItems}>
                            <span>Locación:</span>
                            <iframe
                                title="Ubicación"
                                width="300"
                                height="200"
                                src={groupDetail.location}>
                            </iframe>
                        </div>
                    </div>
                </div>
                <button className={s.inscribe} onClick={update ? (e) => handleSubmit(e) : (e) => handleSuscribe()}>{update ? "Aceptar" : "Inscribirme"}</button>
            </section>
        </div>
    )
}
