import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { IoIosCart } from "react-icons/io";

import "./SearchbarProduct.css";

function SearchbarProduct(props) {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const { setCreationDiv, handleTags, allTags, tags, deleteTag, handleClean } = props;

  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link
              to={
                userInfoFirestore?.isAdmin
                  ? "/dashboard-admin"
                  : "/dashboard-player"
              }
            >
              Volver
            </Link>
          </div>
        </div>
        <div className="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div className="nav-links">
          {userInfoFirestore?.isAdmin ? (
            <b
              onClick={(e) => {
                setCreationDiv(true);
              }}
            >
              CREAR PRODUCTO
            </b>
          ) : (
            <></>
          )}
          <select defaultValue="title2" className="select_container">
            <option value="title2" disabled={true}>
              Filtar por: Precio
            </option>
            <option>Mas económico</option>
            <option>Mas costoso</option>
          </select>
          <select
            defaultValue="title"
            onChange={(e) => handleTags(e)}
            className="select_container"
          >
            <option value="title" disabled={true}>
              Filtar por:
            </option>
            {allTags?.map((tag) => {
              return (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
          <ul>
            {tags?.map((tagId) => {
              return (
                <li key={tagId} value={tagId} onClick={(e) => deleteTag(e)}>
                  {allTags.find((t) => t.id === Number(tagId)).name} ❌
                </li>
              );
            })}
          </ul>
          <button onClick={(e) => handleClean(e)}>LIMPIAR</button>
          <button onClick={() => setShowCart(!showCart)}>
            <IoIosCart />
          </button>
          {showCart ? <ShoppingCart /> : <></>}
        </div>
      </div>
    </>
    // <div className="search__container">
    //   <Link
    //     to={
    //       userInfoFirestore?.isAdmin ? "/dashboard-admin" : "/dashboard-player"
    //     }
    //   >
    //     Volver
    //   </Link>
    //   <button onClick={(e) => handleAllProducts(e)}>TODOS LOS PRODUCTOS</button>
    //   {userInfoFirestore?.isAdmin ? (
    //     <button
    //       onClick={(e) => {
    //         setCreationDiv(true);
    //       }}
    //     >
    //       CREAR PRODUCTO
    //     </button>
    //   ) : (
    //     <></>
    //   )}
    //   <select defaultValue="title2">
    //     <option value="title2" disabled={true}>
    //       Filtar por: Precio
    //     </option>
    //     <option>Mas económico</option>
    //     <option>Mas costoso</option>
    //   </select>
    //   <select defaultValue="title" onChange={(e) => handleTags(e)}>
    //     <option value="title" disabled={true}>
    //       Filtar por:
    //     </option>
    //     {allTags?.map((tag) => {
    //       return (
    //         <option value={tag.id} key={tag.id}>
    //           {tag.name}
    //         </option>
    //       );
    //     })}
    //   </select>
    //   {tags.length > 0 ? (
    //     <ul>
    //       {tags?.map((tagId) => {
    //         return (
    //           <li key={tagId} value={tagId} onClick={(e) => deleteTag(e)}>
    //             {allTags.find((t) => t.id === Number(tagId)).name} ❌
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   ) : (
    //     <p>No has seleccionado etiquetas</p>
    //   )}
    //   <button onClick={(e) => handleClean(e)}>LIMPIAR</button>
    //   <button onClick={() => setShowCart(!showCart)}>🛒</button>
    //   {showCart ? <ShoppingCart /> : <></>}
    // </div>
  );
}

export default SearchbarProduct;
