import React from 'react'
import s from '../DetailEvent/DetailEvent.module.css'

export default function DetailEvent({ title, description, setModalDetail, location }) {
    return (
        <div className={s.DetailContainer}>
            <header>
                <h1>{title}</h1>
            </header>
            <main>
                <span>Description: {description}</span>
                <span>Ubicación: {location}</span>
            </main>
            <button onClick={() => setModalDetail(false)}>Aceptar</button>
        </div>
    )
}
