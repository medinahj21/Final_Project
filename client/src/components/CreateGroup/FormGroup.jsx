import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import s from '../CreateGroup/FormGroup.module.css'
import * as actions from '../../redux/actions/actionsGroup'

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
                [e.target.name]: e.target.value
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
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <label htmlFor="image">
                Imagen:{" "}
                <div className={s.image} >
                    <img src={image} alt="Imagen del grupo" name='image' onChange={handleChange}></img>
                </div>
                {/* <input type="text" name="image" onChange={handleChange} /> */}
                <div onClick={(e) => handleOnClick(e)}>Subir</div>
            </label>
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
                <input type="text" name="description" onChange={handleChange} />
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
                    <option value="">Escoga una opción</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
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
                <input type="text" name="adminId" onChange={handleChange}/>
            </label>
            <button type='submit'>Crear</button>
        </form>
    )
}
