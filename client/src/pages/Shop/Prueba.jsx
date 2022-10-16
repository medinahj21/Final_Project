import React from "react";

export default function Prueba({callback}){

    return(
        <div>
            <h1>Prueba</h1>
            <input onBlur={(e)=>{callback(e.target.value)}}></input>
            <button>Enviar</button>
        </div>
    )
}