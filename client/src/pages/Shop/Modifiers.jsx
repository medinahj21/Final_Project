import React from "react";
import { useState } from "react";

function Modifiers({
  setNewProduct,
  newProduct,
  handleSetNewProductProperties,
}) {
  const [addModifier, setAddModifier] = useState(false);
  const [newModifierType, setNewModifierType] = useState("");
  const [newModifierProperty, setNewModifierProperty] = useState("");
  const [enableOptions, setEnableOptions] = useState(false);
  const [newModifierValue, setNewModifierValue] = useState("");
  const [newModifier, setNeWModifier] = useState([]);
  const [disableAddModifier, setDisableAddModifier] = useState(true);
  const [modifiers, setModifiers] = useState([]);

  const newModifierHanlder = (e) => {
    e.preventDefault();
    setAddModifier(true);
  };

  const newOptionHanlder = (e) => {
    e.preventDefault();
    setNeWModifier({
      [newModifierProperty]: [
        ...newModifier[newModifierProperty],
        newModifierValue,
      ],
    });
    setDisableAddModifier(false);
    setNewModifierValue("");
  };

  const addNewModifierHanlder = () => {
    setAddModifier(false);
    setModifiers([...modifiers, newModifier]);
    setNeWModifier({});
    setNewModifierType("");
    setDisableAddModifier(true);
    setNewProduct({
      ...newProduct,
      modifiers: [...modifiers, newModifier],
    });
  };

  const resetNewModifierHanlder = () => {
    setNeWModifier({});
    setNewModifierType("");
    setNewModifierProperty("");
    setDisableAddModifier(true);
  };

  const nameAndOptionsHandler = (e) => {
    e.preventDefault();
    setEnableOptions(true);
    setNeWModifier({ [newModifierProperty]: [] });
  };

  const prevViewModifierHanlder = (e) => {
    e.preventDefault();
    setDisableAddModifier(false);
    setNeWModifier({ [newModifierProperty]: "" });
  };
  return (
    <>
      <div>
        <label> Modificadores: </label>
        <div>
          <button onClick={newModifierHanlder}> Nuevo modificador ➕</button>
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
                setNewModifierProperty(e.target.value);
              }}
            ></input>
            <button onClick={nameAndOptionsHandler}>
              Confirmar nombre y agregar opciones
            </button>
            {enableOptions ? (
              <div>
                <label>nueva opción</label>
                <input
                  value={newModifierValue}
                  onChange={(e) => {
                    setNewModifierValue(e.target.value);
                  }}
                ></input>
                <button onClick={newOptionHanlder}> agregar opción </button>
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
                setNewModifierProperty(e.target.value);
              }}
            ></input>
            <button onClick={prevViewModifierHanlder}>
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
              onClick={addNewModifierHanlder}
            >
              {" "}
              Añadir nuevo modificador{" "}
            </button>
            <button onClick={resetNewModifierHanlder}>
              Resetear nuevo modificador
            </button>
          </div>
        ) : (
          <p></p>
        )}
        <p>Modificadores producto:{JSON.stringify(modifiers)}</p>
      </div>
      <hr />
      <div>
        <label> Días de plazo para el pago: </label>
        <input
          type="number"
          name="paymentTerm"
          value={newProduct.paymentTerm}
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        ></input>
      </div>
    </>
  );
}

export default Modifiers;
