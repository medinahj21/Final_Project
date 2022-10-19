import React from 'react'
import s from '../UpdateGroup/UpdateGroup.module.css'

export default function UpdateGroup({id, groupDetail, dataToUpdate}) {




    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            
        }
    }

    return (
        <div className={s.containerDetail}>
            <section className={''}>
                <img src={groupDetail.image} className={s.image} alt="" />
            </section>

            <section className={s.containerItems}>
                <div className={s.buttonEdit}>Edit</div>
                <h1>{groupDetail.name}</h1>

                <div className={s.items}>
                    <div className={s.smallInputs}>
                        <div className={s.subItems}>
                            <span>Genero:</span>
                            <input type="text" name='genre' value={groupDetail.genre} readonly="readonly" tabindex="-1" />
                        </div>
                        <div className={s.subItems}>
                            <span>Horario: </span>
                            <input type="text"  readonly="readonly" tabindex="-1" name="schedule" value={groupDetail.schedule} />
                        </div>
                        <div className={s.subItems}>
                            <span>Email: </span>
                            <input type="email" name="email" id="" value={groupDetail.contact} readonly="readonly" tabindex="-1" />
                        </div>
                        <div className={s.subItems}>
                            <span>Costo inscripción: </span>
                            <input type="text" value={groupDetail.inscription_cost} name="inscription_cost"/>
                        </div>
                        <div className={s.subItems}>
                            <span>Contacto: </span>
                            <input type="text" value={groupDetail.contact} name="contact"/>
                        </div>
                        <div className={s.subItems}>
                            <span>WhatsApp: </span>
                            <input type="text" value={groupDetail.whatsapp} name="whatsapp"/>
                        </div>
                        <div className={s.subItems}>
                            <span>Acepta nuevos: </span>
                            <input type="text" value={groupDetail.accept_newPlayers} name="accept_newPlayers"/>
                        </div>
                        <div className={s.subItems}>
                            <span>Admin: </span>
                            <input type="text" value={groupDetail.accept_newPlayers} name="adminId"/>
                        </div>
                    </div>
                    <div className={s.largeInputs}>
                        <div className={s.subItems}>
                            <span>Descripción:</span>
                            <textarea name="description" id="" cols="30" rows="10" value={groupDetail.description} readonly='readonly' tabindex="-1" />
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
                <button className={s.inscribe} onClick={dataToUpdate ? handleSubmit() : 'inscribirme'}>{dataToUpdate ? "Aceptar" : "Inscribirme"}</button>
            </section>
        </div>
    )
}
