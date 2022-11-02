import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanProductDetail,
  getFilterTags,
  getProducts,
} from "../redux/actions/products";
import { updatePlayerCart } from "../redux/actions/player";

import CreateProduct from "../components/Shop/CreateProducts/CreateProduct";
import ShowProducts from "../components/Shop/ProductCard/ShowProducts";
import SearchbarProduct from "../components/Shop/navbarshop/SearchbarProduct";
import Modal from "../components/UI/Modal";
import ContactForm from "../components/ContactForm/ContactForm";

import "./Shop.css";

function Shop() {
  const dispatch = useDispatch();

  const [creationDiv, setCreationDiv] = useState(false);

  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const { cart } = useSelector((state) => state.shoppingCartReducer);

  useEffect(() => {
    if (!userInfoFirestore.isAdmin)
      dispatch(updatePlayerCart(userInfoFirestore.uid, cart));
  }, [dispatch, cart, userInfoFirestore]);

  useEffect(() => {
    dispatch(getProducts(userInfoFirestore.isAdmin));
    dispatch(getFilterTags());
    dispatch(cleanProductDetail());
  }, [dispatch]);

  return (
    <div className="shop__container">
      <SearchbarProduct setCreationDiv={setCreationDiv} />
      {creationDiv ? (
        <Modal clickHandler={() => setCreationDiv(false)}>
          {" "}
          <CreateProduct setCreationDiv={setCreationDiv} />{" "}
        </Modal>
      ) : (
        <></>
      )}
      <ShowProducts />
      <div className="home_footer">
        <ContactForm />
      </div>
    </div>
  );
}

export default Shop;
