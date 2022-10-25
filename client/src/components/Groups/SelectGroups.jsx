import React from "react";

function SelectGroups({ filterByGenre, filterByCategory }) {
  return (
    <>
      <div className="select_container">
        <select
          className="select_content"
          name="filterByGenre"
          defaultValue={"genre"}
          id=""
          onChange={(e) => filterByGenre(e)}
        >
          <option value="genre" disabled={true}>
            Género
          </option>
          <option key={"all"} value={"all"}>
            Todos
          </option>
          <option key={"Male"} value={"Male"}>
            Male
          </option>
          <option key={"Female"} value={"Female"}>
            Female
          </option>
          <option key={"Mix"} value={"Mix"}>
            Mix
          </option>
        </select>
      </div>
      <div className="select_container">
        <select
          className="select_content"
          defaultValue={"category"}
          name="filterByCategory"
          id=""
          onChange={(e) => filterByCategory(e)}
        >
          <option value={"category"} disabled={true}>
            Categoria
          </option>
          <option key={"todos"} value="all">
            Todos
          </option>
          <option key={"Mixto"} value="Mixto">
            Mixto
          </option>
          <option key={"Juvenil"} value="Juvenil">
            Juvenil
          </option>
          <option key={"Adultos"} value="Adultos">
            Adultos
          </option>
        </select>
      </div>
    </>
  );
}

export default SelectGroups;
