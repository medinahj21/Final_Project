import React, { useState } from 'react'
import FormEvent from './FormEvent/FormEvent'
import Modal from '../../components/UI/Modal'

export default function Calendario() {
    const [isCreate, setIsCreate] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [modalOn, setModalOn] = useState(false);

    const openModal = () => {
        setModalOn(true)
    }

    if (modalOn) {
        return (
            <Modal>
                <FormEvent
                    isCreate={isCreate}
                    setIsCreate={setIsCreate}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate} />
            </Modal>
        )
    }

    return (
        <div>
            <h1>Calendario</h1>
            <button type='button' onClick={openModal}>Crear Evento</button>
        </div>
    )
}
