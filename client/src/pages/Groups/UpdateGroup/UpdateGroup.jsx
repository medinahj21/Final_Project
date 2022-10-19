import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import s from '../UpdateGroup/UpdateGroup.module.css'
import * as actions from '../../../redux/actions/actionsGroup';


export default function UpdateGroup({id, groupDetail, update, setUpdate}) {
    const dispatch = useDispatch();
    
    const [inputUpdate, setInputUpdate] = useState(groupDetail);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdate(false)
        dispatch(actions.updateGroup(inputUpdate.id, inputUpdate))
        alert('Producto editado')
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
        setUpdate(!update)
    }
    const handleSuscribe = () => {
        console.log('suscribe');
    }

    return (
        <div className={s.containerDetail}>
            <section className={''}>
                <img src={groupDetail.image} className={s.image} alt="" />
                {update ? <div>Subir</div> : ''}
                
            </section>

            <section className={s.containerItems}>
                <div className={s.buttonEdit} onClick={()=>handleUpdate()}>{update ? 'Cancelar' : 'Editar'}</div>
                <h1>{groupDetail.name}</h1>

                <div className={s.items}>
                    <div className={s.smallInputs}>
                        <div className={s.subItems}>
                            <span>Genero:</span>
                            <input type="text" name='genre' value={inputUpdate.genre} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"} onChange={handleChange}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Horario: </span>
                            <input type="text"  readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"} name="schedule" value={inputUpdate.schedule} onChange={handleChange}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Email: </span>
                            <input type="email" name="email" id="" value={inputUpdate.contact} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"} onChange={handleChange}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Costo inscripción: </span>
                            <input type="text" value={inputUpdate.inscription_cost} name="inscription_cost" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Contacto: </span>
                            <input type="text" value={inputUpdate.contact} name="contact" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"}/>
                        </div>
                        <div className={s.subItems}>
                            <span>WhatsApp: </span>
                            <input type="text" value={inputUpdate.whatsapp} name="whatsapp" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Acepta nuevos: </span>
                            <input type="text" value={inputUpdate.accept_newPlayers} name="accept_newPlayers" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Admin: </span>
                            <input type="text" value={inputUpdate.accept_newPlayers} name="adminId" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"}/>
                        </div>
                        <div className={s.subItems}>
                            <span>Categoria: </span>
                            <input type="text" value={inputUpdate.category} name="adminId" onChange={handleChange} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"}/>
                        </div>
                    </div>
                    <div className={s.largeInputs}>
                        <div className={s.subItems}>
                            <span>Descripción:</span>
                            <textarea name="description" id="" cols="30" rows="10" value={inputUpdate.description} readOnly={update ? false : 'readonly'} tabIndex={ update ? "-1": "0"} onChange={handleChange}/>
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
                <button className={s.inscribe} onClick={update?(e) => handleSubmit(e) : (e) => handleSuscribe()}>{update ? "Aceptar" : "Inscribirme"}</button>
            </section>
        </div>
    )
}
