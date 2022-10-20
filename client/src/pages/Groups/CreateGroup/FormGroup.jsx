import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './FormGroup.module.css'
import * as actions from '../../../redux/actions/actionsGroup'
import UploadImage from '../../../components/UploadImage/UploadImage'

export default function FormGroup() {
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
    })
    const [image, setImage] = useState(null)
    const handleChange = (e) => {
        setGroupInputs((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
                image: image
            }
        })
        console.log(groupInputs)
    }

    const handleOnClick = (e) => {
        const widger_cloudinary = window.cloudinary.createUploadWidget({
            cloudName: 'dmcrq99gc',
            uploadPreset: 'prueba'
        }, (err, result) => {
            if (result.event === 'success') {
                setImage(result.info.url);
                setGroupInputs({
                    ...groupInputs,
                    image: result.info.url
                })
            } else if (err) {
                console.log(err);
            }
        })
        widger_cloudinary.open()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.createGroup(groupInputs))
        dispatch(actions.getGroups())
        alert('Product has been created successfully')
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <UploadImage image={image} setImage={setImage} />
            <label htmlFor="name">
                Nombre:{" "}
                <input type="text" name="name" onChange={handleChange} />
            </label>
            <label htmlFor="location">
                Locación:{" "}
                <input type="text" name="location" onChange={handleChange} />
            </label>
            <label htmlFor="schedule">
                Horario:{" "}
                <input type="text" name="schedule" onChange={handleChange} />
            </label>
            <label htmlFor="description">
                Descripción:{" "}
                <textarea name="description" onChange={handleChange} />
            </label>
            <label htmlFor="inscription_cost">
                Costo de inscripción:{" "}
                <input type="number" name="inscription_cost" onChange={handleChange} />
            </label>
            <label htmlFor="contact">
                Contacto:{" "}
                <input type="text" name="contact" onChange={handleChange} />
            </label>
            <label htmlFor="whatsappGroup">
                Grupo de WhatsApp:{" "}
                <input type="text" name="whatsapp" onChange={handleChange} />
            </label>
            <label htmlFor="accept_newPlayers">
                Acepta nuevos: {" "}
                <select name="accept_newPlayers" id="" onChange={handleChange}>
                    <option selected disabled='true'>Escoga una opción</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </label>
            <label htmlFor="category">
                Categoria: {" "}
                <select name="category" onChange={handleChange}>
                    <option selected disabled='true'>Escoge una opcion</option>
                    <option value="Mixto">Mixto</option>
                    <option value="Juvenil">Juvenil</option>
                    <option value="Adultos">Adultos</option>
                </select>
            </label>
            <label htmlFor="genre" >
                Genero:{" "}
                <input type="radio" name="genre" value="Female" onChange={handleChange} />
                Femenino
                <input type="radio" name="genre" value="Male" onChange={handleChange} />
                Masculino
                <input type="radio" name="genre" value="Mix" onChange={handleChange} />
                Mixto
            </label>
            <label htmlFor="adminId">
                AdminID: {" "}
                <input type="text" name="adminId" onChange={handleChange} />
            </label>
            <button type='submit'>Crear</button>
        </form>
    )
}
