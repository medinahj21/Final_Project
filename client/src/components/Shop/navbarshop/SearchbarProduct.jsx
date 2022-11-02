import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { filterApply, setPageNumPrev } from "../../../redux/actions/products";

import { IoIosCart, IoMdSearch } from "react-icons/io";

import "./SearchbarProduct.css";

function SearchbarProduct(props) {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const { filterTags } = useSelector((state) => state.productsReducer);

  const { setCreationDiv } = props;

  const [showCart, setShowCart] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    tags: [],
    isAscend: true,
    isAdmin: userInfoFirestore.isAdmin,
  });

  const addTags = (e) => {
    if (filters.tags.indexOf(e.target.value) === -1)
      setFilters((prevState) => {
        return {
          ...prevState,
          tags: [...filters.tags, e.target.value],
        };
      });
    dispatch(setPageNumPrev(1));
    dispatch(
      filterApply({ ...filters, tags: [...filters.tags, e.target.value] })
    );
  };

  const deleteTag = (e) => {
    let aux = filters.tags;
    aux.splice(filters.tags.indexOf(e.target.value), 1);
    setFilters((prevState) => {
      return {
        ...prevState,
        tags: aux,
      };
    });
    dispatch(filterApply({ ...filters, tags: aux }));
  };

  const filterByName = (e) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value.trim(),
      };
    });
    dispatch(
      filterApply({ ...filters, [e.target.name]: e.target.value.trim() })
    );
  };

  const orderHandler = (e) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        isAscend: e.target.value,
      };
    });
    console.log(e.target.value);
    dispatch(filterApply({ ...filters, isAscend: e.target.value }));
  };

  useEffect(() => {
    dispatch(filterApply({ ...filters }));
  }, []);

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
          <div className="search-container">
            <input
              id="search-box"
              type="text"
              className="search-box"
              name="name"
              onChange={filterByName}
            />
            <label htmlFor="search-box">
              <span className="search-icon">
                <IoMdSearch />
              </span>
            </label>
            <input type="submit" id="search-submit" />
          </div>
          {/* <div>
            <input
              required
              type="text"
              placeholder="Buscar..."
              value={productSearched}
              // onKeyDown={(e) => handleSearch(e)}
              onChange={filterByName}
            />
            <button className="" type="submit" onClick={(e) => handleSearch(e)}>
              <FcSearch />
            </button>
          </div> */}
          {/* <button onClick={handleAllProduct} className="button-nav">
            Todos
          </button> */}
          <select
            defaultValue="title2"
            className="select_container"
            onChange={orderHandler}
          >
            <option value="title2" disabled={true}>
              Ordenar por precio
            </option>
            <option value={true}>Mas costoso</option>
            <option value={false}>Mas económico</option>
          </select>
          <select
            defaultValue="title"
            onChange={addTags}
            className="select_container "
          >
            <option value="title" disabled={true}>
              Filtrar por
            </option>
            {filterTags?.map((tag) => {
              return (
                <option value={tag.name} key={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
          {filters.tags?.length > 0 && (
            <ul className="tag-list">
              <>
                {filters.tags.map((tag) => {
                  return (
                    <li onClick={deleteTag} key={tag + Math.random() * 500}>
                      {tag} X
                    </li>
                  );
                })}
              </>
            </ul>
          )}
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
