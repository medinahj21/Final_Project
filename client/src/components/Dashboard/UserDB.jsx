import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayersFromDB } from "../../redux/actions/player";

export default function UserDB(){

    const dispatch = useDispatch();
    const players = useSelector((state) => state.playerReducer.playersDB);

    useEffect(()=>{
        if(players.length===0) dispatch(getPlayersFromDB());        
    },[dispatch,players])
    
    
    return(
        <>
            <h1>Pruebas DB</h1>
            <p>{JSON.stringify(players)}</p> 
        </>
    )
}