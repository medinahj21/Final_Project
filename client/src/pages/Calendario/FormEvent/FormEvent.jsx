import React, { useEffect, useState } from 'react';
import s from '../FormEvent/FormEvent.module.css'

export default function FormCalendario() {

  const [inputs, setInputs] = useState({
    name: "",
    state: "",
    description: "",
    location: "",
    repetitive: "",
    date: "",
    start: "",
    end: "",
  })

  const [isRepetitive, setIsRepetitive] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleRepetitive = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    setIsRepetitive(!isRepetitive);
  }

  return (
    <div className={s.formEventContainer}>
      <section className={s.itemHeaderContainer}>
        <button type="button">x</button>
        <div className={s.item}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name='name' onChange={handleChange} />
        </div>
        <div className={s.item}>
          <label htmlFor="state">Estado:</label>
          <select name="state" onChange={handleChange} value='s'>
            <option value="s" selected={true} disabled={true} >Selecciona una opción</option>
            <option value="Pending">Pendiente</option>
            <option value="Canceled">Cancelado</option>
            <option value="Postponed">Aplazado</option>
            <option value="Finished">Finalizado</option>
          </select>
        </div>
      </section>
      <section className={s.itemBodyContainer}>
        <div className={s.item}>
          <label htmlFor="description">Descripción:</label>
          <textarea name="description" cols="30" rows="10" placeholder='Escribe aquí' onChange={handleChange}></textarea>
        </div>
        <div className={s.item}>
          <label htmlFor="location">Ubicación:</label>
          <input name="location" cols="30" rows="10" placeholder='Escribe aquí' onChange={handleChange} />
        </div>
        <div className={s.inputsRadio}>
          <label htmlFor="repetitive">Repetitivo:</label>
          <div className={s.radios}>
            <input type="radio" name="repetitive" value={true} onChange={handleRepetitive} />
            <span>true</span>
            <input type="radio" name="repetitive" value={false} onChange={handleRepetitive} />
            <span>false</span>
          </div>
        </div>
        {isRepetitive ?
          <div className={s.item}>
            <label htmlFor="dias">Días</label>
            <select name="dias" onChange={handleChange} value='s'>
              <option selected value="s" disabled={true}>Selecciona una opción</option>
              <option value="lunes">Lunes</option>
              <option value="martes">Martes</option>
              <option value="miercoles">Miercoles</option>
              <option value="jueves">Jueves</option>
              <option value="viernes">Viernes</option>
            </select>
            <div className={s.item}>
              <label htmlFor="start">Inicio:</label>
              <input type="time" name='start' onChange={handleChange} />
            </div>
            <div className={s.item}>
              <label htmlFor="end">Final: </label>
              <input type="time" name='end' onChange={handleChange} />
            </div>
          </div>
          : 
          <div className={s.noRepetitiveInputs}>
            <div className={s.item}>
              <label htmlFor="date">Fecha: </label>
              <input type="date" name='date' onChange={handleChange} />
            </div>
            <div className={s.item}>
              <label htmlFor="start">Inicio:</label>
              <input type="time" name='start' onChange={handleChange} />
            </div>
            <div className={s.item}>
              <label htmlFor="end">Final: </label>
              <input type="time" name='end' onChange={handleChange} />
            </div>
          </div>
        }
      </section>
    </div>
  )
}
