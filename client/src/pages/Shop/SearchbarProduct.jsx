import React from "react";

import "./SearchbarProduct.css";

function SearchbarProduct({
  handleAllProducts,
  setCreationDiv,
  handleTags,
  allTags,
  tags,
  deleteTag,
  handleClean,
}) {
  return (
    <div className="search__container">
      <button onClick={(e) => handleAllProducts(e)}>TODOS LOS PRODUCTOS</button>
      <button
        onClick={(e) => {
          setCreationDiv(true);
        }}
      >
        FORMULARIO DE CREACION DEL PRODUCTO
      </button>
      <select defaultValue="title2">
        <option value="title2" disabled={true}>
          Filtar por: Precio
        </option>
        <option>Mas económico</option>
        <option>Mas costoso</option>
      </select>
      <select defaultValue="title" onChange={(e) => handleTags(e)}>
        <option value="title" disabled={true}>
          Filtar por: Genero
        </option>
        {allTags?.map((tag) => {
          return (
            <option value={tag.id} key={tag.id}>
              {tag.name}
            </option>
          );
        })}
      </select>
      {tags.length > 0 ? (
        <ul>
          {tags?.map((tagId) => {
            return (
              <li key={tagId} value={tagId} onClick={(e) => deleteTag(e)}>
                {allTags.find((t) => t.id === Number(tagId)).name} ❌
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No has seleccionado etiquetas</p>
      )}
      <button onClick={(e) => handleClean(e)}>LIMPIAR</button>
    </div>
  );
}

export default SearchbarProduct;
