import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import "./CreateProduct.css";

function Modifiers({
  setNewProduct,
  newProduct,
  handleSetNewProductProperties,
}) {
  const initialState = useSelector(
    (state) => state.productsReducer.productDetail
  )[0];

  const [addModifier, setAddModifier] = useState(false);
  const [newModifierType, setNewModifierType] = useState("");
  const [newModifierProperty, setNewModifierProperty] = useState("");
  const [enableOptions, setEnableOptions] = useState(false);
  const [newModifierValue, setNewModifierValue] = useState("");
  const [newModifier, setNeWModifier] = useState([]);
  const [disableAddModifier, setDisableAddModifier] = useState(true);
  const [modifiers, setModifiers] = useState(
    initialState ? [...initialState.modifiers] : []
  );

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

  const handleDeleteModifier = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let aux = modifiers;
    aux.splice(e.target.value, 1);
    setModifiers(aux);
    setNewProduct({
      ...newProduct,
      modifiers: aux,
    });
  };

  return (
    <>
      <label> Modificadores: </label>
      <div>
        <button onClick={newModifierHanlder} className="modify__button">
          {" "}
          Nuevo modificador ➕
        </button>
      </div>
      {modifiers?.map((obj, index) => {
        if (Object.values(obj)[0] === "") {
          return (
            <div key={index} className="">
              <p>{Object.keys(obj)[0]}</p>
              <button
                className="modify__button"
                value={index}
                onClick={(e) => handleDeleteModifier(e)}
              >
                Eliminar
              </button>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <label>{Object.keys(obj)[0]}:</label>
              {Object.values(obj)[0]?.map((option, i) => (
                <p value={option} key={i}>
                  {option}
                </p>
              ))}
              <button
                className="modify__button"
                value={index}
                onClick={(e) => handleDeleteModifier(e)}
              >
                Eliminar
              </button>
            </div>
          );
        }
      })}
      {addModifier ? (
        <div className="select_container">
          <select
            className="select_content"
            value={0}
            onChange={(e) => setNewModifierType(e.target.value)}
          >
            <option value={0} disabled={true}>
              Opciones extras
            </option>
            <option value={"opciones"}>Especificaciones</option>
            <option value={"campoDeTexto"}>Agregados</option>
          </select>
        </div>
      ) : (
        <></>
      )}
      {newModifierType === "opciones" && addModifier ? (
        <>
          <h3>Especificaciones</h3>
          <div className="forms_field">
            <input
              placeholder="EJ: Talla, color... etc "
              className="forms_field-input"
              onChange={(e) => {
                setNewModifierProperty(e.target.value);
              }}
            />
            <button className="modify__button" onClick={nameAndOptionsHandler}>
              Confirmar
            </button>
          </div>
          {enableOptions ? (
            <>
              <div className="forms_field">
                <input
                  value={newModifierValue}
                  placeholder="EJ: xl, rojo... etc "
                  className="forms_field-input"
                  onChange={(e) => {
                    setNewModifierValue(e.target.value);
                  }}
                />
                <button className="modify__button" onClick={newOptionHanlder}>
                  Agregar
                </button>
              </div>
            </>
          ) : (
            <p>Confirma nombre para agregar opciones</p>
          )}
        </>
      ) : newModifierType === "campoDeTexto" ? (
        <>
          <h2>Agregados</h2>
          <div className="forms_field">
            <input
              type="text"
              name="name"
              placeholder="EJ: N° camiseta, apodo"
              className="forms_field-input"
              onChange={(e) => {
                setNewModifierProperty(e.target.value);
              }}
            />
            <button
              className="modify__button"
              onClick={prevViewModifierHanlder}
            >
              Aceptar
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      {!disableAddModifier ? (
        <div className="modifier__container-btn">
          <button
            className="modify__button"
            disabled={disableAddModifier}
            onClick={addNewModifierHanlder}
          >
            {" "}
            Añadir modificador{" "}
          </button>
          <button className="modify__button" onClick={resetNewModifierHanlder}>
            Resetear modificador
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="forms_field">
        <input
          type="number"
          name="paymentTerm"
          placeholder="Plazo (días)"
          className="forms_field-input"
          onChange={(e) => {
            handleSetNewProductProperties(e);
          }}
        />
      </div>
    </>
  );
}

export default Modifiers;
