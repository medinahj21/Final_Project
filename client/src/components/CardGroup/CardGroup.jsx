import React from 'react'
import s from '../CardGroup/CardGroup.module.css'
import { Link } from "react-router-dom";

export default function CardGroup({ name, schedule, id, price, img }) {
  return (
    <Link to={`/group/detail/${id}`}>
      <div className={s.cardBody}>
        <img src={img} alt="" className={s.image} />
        <div className={s.info}>
          <h2>{name}</h2>
          <span>Horario: {schedule}</span>
          <span>Costo inscripción: {price}</span>
        </div>
      </div>
    </Link>
  )
}
