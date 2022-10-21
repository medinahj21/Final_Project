import React from "react";

function SelectGroups({ filterByGenre, filterByCategory }) {
  return (
    <div>
      <label>Filtrar por: </label>
      <span>Generos: </span>
      <select name="filterByGenre" id="" onChange={(e) => filterByGenre(e)}>
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
      <span>Categorías: </span>
      <select
        name="filterByCategory"
        id=""
        onChange={(e) => filterByCategory(e)}
      >
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
  );
}

export default SelectGroups;
