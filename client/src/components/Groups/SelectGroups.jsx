import React from "react";

function SelectGroups({ filtros }) {
  return (
    <>
      <div className="select_container">
        <select
          className="select_content"
          name="genre"
          defaultValue={"genre"}
          id=""
          onChange={(e) => filtros(e)}
        >
          <option value="genre" disabled={true}>
            Género
          </option>
          <option key={"all"} value={""}>
            Todos
          </option>
          <option key={"Male"} value={"Masculino"}>
            Masculino
          </option>
          <option key={"Female"} value={"Femenino"}>
            Femenino
          </option>
          <option key={"Mix"} value={"Mixto"}>
            Mixto
          </option>
        </select>
      </div>
      <div className="select_container">
        <select
          className="select_content"
          defaultValue={"category"}
          name="category"
          id=""
          onChange={(e) => filtros(e)}
        >
          <option value={"category"} disabled={true}>
            Categoría
          </option>
          <option key={"todos"} value="">
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
