import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as actions from '../../redux/actions/actionsGroup';
import s from '../GroupDetail/GroupDetail.module.css'
import { Link } from "react-router-dom";

export default function GroupDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();

    const GroupDetail = useSelector((state) => state.groupReducer.groupDetail);

    useEffect(() => {
        dispatch(actions.getGroupDetail(id))
    }, [dispatch])
    console.log(GroupDetail);
    return (
        <div className={s.containerDetail}>
            <img src={GroupDetail.image} className={s.image} alt="" />
            <div className={s.items}>
                <h1>{GroupDetail.name}</h1>
                <span>({GroupDetail.genre})</span>

                <div className={s.subItems}>
                    <span>Descripción: {GroupDetail.description}</span>
                    <span>Locación:
                        <iframe
                            title="Ubicación"
                            width="300"
                            height="200"
                            src={GroupDetail.location}>
                        </iframe>
                    </span>

                    <span>WhatsApp: {GroupDetail.whatsapp}</span>
                    <span>Horario: {GroupDetail.schedule}</span>
                    <span>Email: {GroupDetail.contact}</span>
                </div>

                <h3>Costo inscripción: {GroupDetail.inscription_cost}</h3>
                <button>Inscribirme</button>
            </div>
        </div>
    )
}
