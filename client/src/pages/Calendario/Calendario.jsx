import React, { useState } from 'react'
import FormEvent from './FormEvent/FormEvent'
import Modal from '../../components/UI/Modal'

export default function Calendario() {
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [modalOn, setModalOn] = useState(false);

    const handleModal = () => {
        setModalOn(!modalOn)
    }

    if (modalOn) {
        return (
            <Modal>
                <FormEvent
                    isCreate={isCreate}
                    setIsCreate={setIsCreate}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate} 
                    handleModal={handleModal}/>
            </Modal>
        )
    }

    return (
        <div>
            <h1>Calendario</h1>
            <button type='button' onClick={handleModal}>Crear Evento</button>
        </div>
    )
}
