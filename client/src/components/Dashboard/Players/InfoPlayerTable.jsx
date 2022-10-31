import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfoPlayerRow from './InfoPlayerRow';
import { getPlayersFromDB } from '../../../redux/actions/player'

export default function InfoPlayerTable() {

    const dispatch = useDispatch();
    const players = useSelector((state) => state.playerReducer.playersDB)

    useEffect(() => {
        dispatch(getPlayersFromDB())
    }, [dispatch])

    console.log(players[0]);

    return (
        <div className="table">
            <div className={"row blue header"}>
                <div className="cell">Foto</div>
                <div className="cell">Nombre</div>
                <div className="cell">Correo</div>
                <div className="cell"></div>
                <div className="cell"></div>
            </div>
            {players.length 
            ? players.map((player) => {
                return <InfoPlayerRow player={player} />;
            })
            :
            <span>No hay jugadores...</span>
            }
        </div>
    )
}
