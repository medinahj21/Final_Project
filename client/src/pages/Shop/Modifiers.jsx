import React from "react";
import { useState } from "react";

export default function Modifiers({ callback, modifiers }) {
  const [addModifier, setAddModifier] = useState(false);
  const [newModifierType, setNewModifierType] = useState("");
  const [newModifierProperty, setNewModifierProperty] = useState("");
  const [enableOptions, setEnableOptions] = useState(false);
  const [newModifierValue, setNewModifierValue] = useState("");
  const [newModifier, setNeWModifier] = useState([]);
  const [disableAddModifier, setDisableAddModifier] = useState(true);

  return (
    <div>
      <div>
        <label> Modificadores: </label>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAddModifier(true);
            }}
          >
            {" "}
            Nuevo modificador ➕
          </button>
        </div>
        {addModifier ? (
          <div>
            <label> Tipo: </label>
            <select
              value={0}
              onChange={(e) => setNewModifierType(e.target.value)}
            >
              <option value={0} disabled={true}>
                {" "}
                selecciona tipo
              </option>
              <option value={"opciones"}>{"Opciones"}</option>
              <option value={"campoDeTexto"}>{"Campo de texto"}</option>
            </select>
          </div>
        ) : (
          <p></p>
        )}
        {newModifierType === "opciones" && addModifier ? (
          <div>
            <h1>opciones</h1>
            <label> Nombre: </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setNewModifierProperty(e.target.value);
              }}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEnableOptions(true);
                setNeWModifier({ [newModifierProperty]: [] });
              }}
            >
              Confirmar nombre y agregar opciones
            </button>
            {enableOptions ? (
              <div>
                <label>nueva opción</label>
                <input
                  value={newModifierValue}
                  onChange={(e) => {
                    e.preventDefault();
                    setNewModifierValue(e.target.value);
                  }}
                ></input>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNeWModifier({
                      [newModifierProperty]: [
                        ...newModifier[newModifierProperty],
                        newModifierValue,
                      ],
                    });
                    setDisableAddModifier(false);
                    setNewModifierValue("");
                  }}
                >
                  {" "}
                  agregar opción{" "}
                </button>
                <p>
                  {" "}
                  nuevo modificador vista previa: {JSON.stringify(newModifier)}
                </p>
              </div>
            ) : (
              <p>Confirma nombre para agregar opciones</p>
            )}
          </div>
        ) : newModifierType === "campoDeTexto" ? (
          <div>
            <h1>Texto</h1>
            <label> Nombre: </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setNewModifierProperty(e.target.value);
              }}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                setDisableAddModifier(false);
                setNeWModifier({ [newModifierProperty]: "" });
              }}
            >
              ver vista previa de modificador de texto
            </button>
            <p>
              {" "}
              nuevo modificador vista previa: {JSON.stringify(newModifier)}
            </p>
          </div>
        ) : (
          <p></p>
        )}
        {!disableAddModifier ? (
          <div>
            <button
              disabled={disableAddModifier}
              onClick={(e) => {
                e.preventDefault();
                setAddModifier(false);
                callback([...modifiers, newModifier]);
                setNeWModifier({});
                setNewModifierType("");
                setDisableAddModifier(true);
              }}
            >
              {" "}
              Añadir nuevo modificador{" "}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setNeWModifier({});
                setNewModifierType("");
                setNewModifierProperty("");
                setDisableAddModifier(true);
              }}
            >
              Resetear nuevo modificador
            </button>
          </div>
        ) : (
          <p></p>
        )}
        <p>Modificadores producto:{JSON.stringify(modifiers)}</p>
      </div>
    </div>
  );
}
