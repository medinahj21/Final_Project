import React from "react";

function Labels({ handleTags, filterTags, tags, deleteTag}) {

  return (
    <div>
      <label> Etiquetas </label>
      <select
        name="Tags"
        value={0}
        onChange={(e) => {
          handleTags(e);
        }}
      >
        <option value={0}> selecciona etiquetas </option>
        {filterTags?.map((tag) => {
          return (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          );
        })}
      </select>
      {tags.length > 0 ? (
        <div>
          <ul>
            {tags?.map((tagId) => {
              return (
                <li
                  key={tagId}
                  value={tagId}
                  onClick={(e) => {
                    deleteTag(e);
                  }}
                >
                  {filterTags.find((t) => t.id === Number(tagId)).name} ❌
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>no hay etiquetas aún</p>
      )}
    </div>
  );
}

export default Labels;
