import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ShoppingCart from "../ShoppingCart/ShoppingCart";

import { IoIosCart } from "react-icons/io";

import "./SearchbarProduct.css";
import { orderByPrice } from "../../../redux/actions/products";

function SearchbarProduct(props) {
  const dispatch= useDispatch();
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const {
    setCreationDiv,
    handleTags,
    allTags,
    tags,
    deleteTag,
    handleClean,
    handleAllProducts,
  } = props;

  const [showCart, setShowCart] = useState(false);

  const handleAllProduct = (e) => {
    handleClean(e);
    handleAllProducts(e);
  };

  const handleOrderByPrice=(e)=>{
    console.log("ordenamiento", e.target.value)
    dispatch(orderByPrice(e.target.value))
  }

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
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div className="nav-links nav-links-shop">
          {userInfoFirestore?.isAdmin ? (
            <b
              className="button-nav"
              onClick={(e) => {
                setCreationDiv(true);
              }}
            >
              Crear producto
            </b>
          ) : (
            <></>
          )}{" "}
          <button onClick={handleAllProduct} className="button-nav">
            Todos
          </button>
          <select 
            defaultValue="title2" 
            className="select_container"
            onChange={(e)=> handleOrderByPrice(e)}>
            <option value="title2" disabled={true}>
              Ordenar por: Precio
            </option>
            <option value= "cheaper-to">Mas económico</option>
            <option value= "expensive-to">Mas costoso</option>
          </select>
          <select
            defaultValue="title"
            onChange={(e) => handleTags(e)}
            className="select_container "
          >
            <option value="title" disabled={true}>
              Filtrar por:
            </option>
            {allTags?.map((tag) => {
              return (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
          <ul className="tag-list">
            {tags?.map((tagId) => {
              return (
                <li key={tagId} value={tagId} onClick={(e) => deleteTag(e)}>
                  {allTags.find((t) => t.id === Number(tagId)).name} ❌
                </li>
              );
            })}
          </ul>
          <button
            className="cart-button-nav"
            onClick={() => setShowCart(!showCart)}
          >
            <IoIosCart />
          </button>
          {showCart ? <ShoppingCart /> : <></>}
        </div>
      </div>
    </>
  );
}

export default SearchbarProduct;
