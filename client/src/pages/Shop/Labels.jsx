<<<<<<< HEAD:client/src/pages/Shop/Labels.jsx
import React from "react";

function Labels({ handleTags, filterTags, tags, deleteTag }) {
=======
import React, { useState }from "react";

function Labels({ 
  handleTags,
  filterTags,
  tags,
  deleteTag,
  newProduct,
  setNewProduct,
 }) {

  const [addLabel, setAddLabel] = useState(false);
  const [newLabelValue, setNewLabelValue] = useState("");
  
  let lastFilterTagId= filterTags[filterTags.length-1].id;

const newLabelHandler = (e)=> {
  e.preventDefault();
  setAddLabel(true);
}

const addNewLabelHanlder = (labelValue) => {
  setAddLabel(false);
  setNewProduct({
    ...newProduct,
    filterTags: [...filterTags, {id:++lastFilterTagId, name: labelValue} ]
});
}



>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd:client/src/components/Shop/CreateProducts/Labels.jsx
  return (
    <>
      <label> Etiquetas: </label>
      <div>
        <button onClick= {newLabelHandler} className="modify__button">
          {" "}
          Nueva etiqueta ➕
        </button>
      </div>
      {
        addLabel? (
          <div>
          <label>Nombre de etiqueta:</label>
          <input
            value={newLabelValue}
            name= "etiqueta" 
            type= "text"
            placeholder="nombre de la etiqueta"
            onChange={(e) => {
              setNewLabelValue(e.target.value);
            }}
            />
            <button className="confirm-new-label" onClick={()=> addNewLabelHanlder(newLabelValue)}>Agregar etiqueta</button>
          </div>
        ):(<></>)
      }
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
          {filterTags?.map((tag) => {
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
                  {filterTags.find((t) => t.id === Number(tagId)).name} ❌
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
