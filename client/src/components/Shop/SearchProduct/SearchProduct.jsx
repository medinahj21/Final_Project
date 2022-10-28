import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";

const SearchProduct = () => {
  const [name, setName] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
    
  };

  const handleClick = () => {
    if (name !== "") {
      setName("");
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (name !== "") {
        setName("");
      }
    }
  };

  return (
    <div>
      <div className="searchProduct-container">
        <input
          className="searchProduct-input"
          required
          type="text"
          placeholder="Buscar..."
          value={name}
          onKeyDown={(e) => handleOnKeyDown(e)}
          onChange={(e) => handleNameInput(e)}
        />
        <button
          className="searchBar-button"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          <FcSearch/>
        </button>
      </div>
    </div>
  );
};

export default SearchProduct;
