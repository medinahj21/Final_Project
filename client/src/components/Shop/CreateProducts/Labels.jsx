import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Labels({
  handleTags,
  tags,
  deleteTag,
}) {
  const [addLabel, setAddLabel] = useState(false);
  const [newLabelValue, setNewLabelValue] = useState("");

  const newLabelHandler = (e) => {
    e.preventDefault();
    setAddLabel(true);
  };

  const addNewLabelHandler = (labelValue) => {
    setAddLabel(false);
    axios
      .post("http://localhost:3001/tags/create", {name:labelValue})
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
      
  };

  const allFilterTags= useSelector((state)=> state.productsReducer.filterTags)

  return (
    <>
      <label> Etiquetas: </label>
      <div>
        <button onClick={newLabelHandler} className="modify__button">
          {" "}
          Nueva etiqueta ➕
        </button>
      </div>
      {addLabel ? (
        <div>
          <label>Nombre de etiqueta:</label>
          <input
            value={newLabelValue}
            name="etiqueta"
            type="text"
            placeholder="nombre de la etiqueta"
            onChange={(e) => {
              setNewLabelValue(e.target.value);
            }}
          />
          <button
            className="confirm-new-label"
            onClick={() => addNewLabelHandler(newLabelValue)}
          >
            Agregar etiqueta
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="select_container">
        <select
          className="select_content"
          name="Tags"
          defaultValue="type"
          onChange={(e) => {
            handleTags(e);
          }}
        >
          <option value="type"> Selecciona etiquetas </option>
          {allFilterTags?.map((tag) => {
            return (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            );
          })}
        </select>
      </div>
      {tags.length > 0 ? (
        <ul>
          {tags?.map((tagId) => {
            return (
              <>
                <li
                  key={tagId}
                  value={tagId}
                  onClick={(e) => {
                    deleteTag(e);
                  }}
                >
                  {allFilterTags.find((t) => t.id === Number(tagId)).name} ❌
                </li>
              </>
            );
          })}
        </ul>
      ) : (
        <p>No has seleccionado ninguna etiqueta</p>
      )}
    </>
  );
}

export default Labels;
