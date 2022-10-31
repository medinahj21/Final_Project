import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanProductDetail,
  cleanProducts,
  getFilterTags,
  getProducts,
  setPageNumPrev,
} from "../../redux/actions/products";
import { updatePlayerCart } from "../../redux/actions/player";

<<<<<<< HEAD:client/src/pages/Shop/Shop.jsx
import "../Shop/Shop.css";
import CreateProduct from "./CreateProduct";
import { handleFilter } from "./utils/filters";
import ShowProducts from "./ShowProducts";
import SearchbarProduct from "./SearchbarProduct";
import Modal from "../../components/UI/Modal";
=======
import { handleFilter } from "../utils/filter";

import CreateProduct from "../components/Shop/CreateProducts/CreateProduct";
import ShowProducts from "../components/Shop/ProductCard/ShowProducts";
import SearchbarProduct from "../components/Shop/navbarshop/SearchbarProduct";
import Modal from "../components/UI/Modal";
import ContactForm from "../components/ContactForm/ContactForm";

import "./Shop.css";
>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd:client/src/pages/Shop.jsx

function Shop() {
  const [creationDiv, setCreationDiv] = useState(false);
  const [tags, setTags] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  const dispatch = useDispatch();


  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);
<<<<<<< HEAD:client/src/pages/Shop/Shop.jsx
   const { userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );
  useEffect(()=>{
    dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart))
  },[dispatch,productsInCart,userInfoFirestore.uid])
=======
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if(!userInfoFirestore.isAdmin) dispatch(updatePlayerCart(userInfoFirestore.uid, productsInCart));
  }, [dispatch, productsInCart, userInfoFirestore]);
>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd:client/src/pages/Shop.jsx

  useEffect(() => {
    async function getTags() {
      await dispatch(getFilterTags());
      await dispatch(cleanProductDetail());
    }
    getTags();
  }, [dispatch]);

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const allTags = useSelector((state) => state.productsReducer.filterTags);

  useEffect(() => {
    if (allProducts) {
      setDataFiltered(allProducts);
      return;
    }
    dispatch(getProducts());
  }, [dispatch, allProducts]);

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

    let aux = handleFilter(
      allProducts,
      [...tags, Number(e.target.value)],
      allTags
    );
    setDataFiltered(aux);
    dispatch(setPageNumPrev(1));
  };

  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
    let aux2 = handleFilter(allProducts, aux, allTags);
    setDataFiltered(aux2);
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
      {creationDiv ? (
        <Modal clickHandler={()=>setCreationDiv(false)}>
          {" "}
          <CreateProduct setCreationDiv={setCreationDiv} isCreate={true} />{" "}
        </Modal>
      ) : (
        <></>
      )}
      <ShowProducts dataFiltered={dataFiltered} />
      <div className="home_footer">
        <ContactForm />
      </div>
    </div>
  );
}

export default Shop;
