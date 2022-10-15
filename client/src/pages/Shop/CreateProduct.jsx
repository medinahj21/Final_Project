import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFilterTags } from "../../redux/actions/products";

export default function CreateProduct() {
  const dispatch = useDispatch();

  const filterTags = useSelector((state) => state.productsReducer.filterTags);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function getTags() {
      await dispatch(getFilterTags());
    }
    getTags();
  }, [dispatch]);

  const handleTags = (e) => {
    if (tags.indexOf(Number(e.target.value)) === -1)
      setTags([...tags, Number(e.target.value)]);

    console.log(tags);
  };
  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
  };

  return (
    <div>
      <form>
        <div>
          <label> Nombre producto</label>
          <input></input>
        </div>
        <div>
          <label> Imagen </label>
          <input></input>
        </div>
        <div>
          <label> Price </label>
          <input></input>
        </div>
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
      </form>
    </div>
  );
}
