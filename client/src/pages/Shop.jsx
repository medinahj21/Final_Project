import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcSearch } from "react-icons/fc";

import {
  cleanProductDetail,
  cleanProducts,
  getFilterTags,
  getProducts,
  setPageNumPrev,
  orderByPrice,
} from "../redux/actions/products";
import { updatePlayerCart } from "../redux/actions/player";

import { handleFilter } from "../utils/filter";

import CreateProduct from "../components/Shop/CreateProducts/CreateProduct";
import ShowProducts from "../components/Shop/ProductCard/ShowProducts";
import SearchbarProduct from "../components/Shop/navbarshop/SearchbarProduct";
import Modal from "../components/UI/Modal";
import ContactForm from "../components/ContactForm/ContactForm";

import "./Shop.css";

function Shop() {
  const [creationDiv, setCreationDiv] = useState(false);
  const [tags, setTags] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [productSearched, setProductSearched] = useState("");
  const [combinedFilter, setCombinedFilter] = useState([...dataFiltered]);

  const dispatch = useDispatch();
  
  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const fullProducts = useSelector((state) => state.productsReducer.allProducts);
  const allTags = useSelector((state) => state.productsReducer.filterTags);
  const isAdmin = userInfoFirestore.isAdmin;

  useEffect(() => {
    if (!userInfoFirestore.isAdmin)
      dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart));
  }, [dispatch, productsInCart, userInfoFirestore]);

  useEffect(() => {
    async function getTags() {
      await dispatch(getFilterTags());
      await dispatch(cleanProductDetail());
    }
    getTags();
  }, [dispatch]);

  const allProducts = isAdmin 
    ? fullProducts
    : fullProducts.filter((prod) => prod.state === true);


  useEffect(() => {
    if (allProducts) {
      setDataFiltered(allProducts);
      setCombinedFilter(allProducts);
      return
    } else {
      dispatch(getProducts());
    }
  }, [dispatch]);

  const handleAllProducts = (e) => {
    dispatch(getProducts());
    setDataFiltered(allProducts);
  };

  const handleClean = () => {
    dispatch(cleanProducts());
    setDataFiltered([]);
    setTags([]);
    dispatch(setPageNumPrev(1));
  };

  const handleTags = (e) => {
    if (tags.indexOf(Number(e.target.value)) === -1)
      setTags([...tags, Number(e.target.value)]);

    let aux = handleFilter(allProducts, [...tags, Number(e.target.value)]);
    setDataFiltered(aux);
    setCombinedFilter(aux);
    dispatch(setPageNumPrev(1));
  };
  

  const handleSearch = (e) => {
    setProductSearched(e.target.value);
    let mixFilters;
    if (productSearched === "") setCombinedFilter(dataFiltered);
    else {
      mixFilters = dataFiltered?.filter((product) =>
        product.name.toLowerCase().includes(productSearched.toLowerCase())
      );
    }

    mixFilters && mixFilters !== []
      ? setCombinedFilter(mixFilters)
      : setCombinedFilter([]);

    if (e.keyCode === 13) {
      if (productSearched !== "") {
        let mixFilters = dataFiltered.filter((product) =>
          product.name.toLowerCase().includes(productSearched.toLowerCase())
        );
        setCombinedFilter(mixFilters);
      }
    }
  };

  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
    let aux2 = handleFilter(allProducts, aux, allTags);
    setDataFiltered(aux2);
    setCombinedFilter(aux2);
  };

  return (
    <div className="shop__container">
      <SearchbarProduct
        handleAllProducts={handleAllProducts}
        setCreationDiv={setCreationDiv}
        handleTags={handleTags}
        allTags={allTags}
        tags={tags}
        deleteTag={deleteTag}
        handleClean={handleClean}
      />
      <div>
        <input
          className="searchProduct-input"
          required
          type="text"
          placeholder="Buscar..."
          value={productSearched}
          onKeyDown={(e) => handleSearch(e)}
          onChange={(e) => handleSearch(e)}
        />
        <button
          className="searchBar-button"
          type="submit"
          onClick={(e) => handleSearch(e)}
        >
          <FcSearch />
        </button>
      </div>
      {creationDiv ? (
        <Modal clickHandler={() => setCreationDiv(false)}>
          {" "}
          <CreateProduct setCreationDiv={setCreationDiv} isCreate={true} />{" "}
        </Modal>
      ) : (
        <></>
      )}
      <ShowProducts
        combinedFilter={combinedFilter}
      />
      <div className="home_footer">
        <ContactForm />
      </div>
    </div>
  );
}

export default Shop;
