import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  getFilterTags,
  getProducts,
} from "../../../redux/actions/products";

import { validate } from "../../../utils/validate";
import { notify, notifyError } from "../../../utils/toastify";

import Labels from "./Labels";
import Modifiers from "./Modifiers";
import ProductProperties from "./ProductProperties";
import ProductStock from "./ProductStock";

import { ToastContainer } from "react-toastify";

import "./CreateProduct.css";

export default function CreateProduct({ setCreationDiv }) {
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);

  const [isOrder, setIsOrder] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    modifiers: [],
    FilterTags: [],
    isOrder: true,
    stock: 0,
    state: true,
    paymentTerm: 0,
  });
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  useEffect(() => {
    async function getTags() {
      await dispatch(getFilterTags());
    }
    getTags();
  }, [dispatch]);

  const handleTags = (e) => {
    if (tags.indexOf(Number(e.target.value)) === -1)
      setTags([...tags, Number(e.target.value)]);
    setNewProduct({
      ...newProduct,
      FilterTags: [...tags, Number(e.target.value)],
    });
  };

  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
    setNewProduct({
      ...newProduct,
      FilterTags: aux,
    });
  };

  const handleSetNewProductProperties = (e) => {
    e.preventDefault();
    setNewProduct({
      ...newProduct,
      [e.target.name]: isNaN(e.target.value)
        ? e.target.value
        : Number(e.target.value),
    });
    validate(newProduct);
  };

  const OrderOrStockHanlde = (e) => {
    e.preventDefault();
    setIsOrder(e.target.value);
    setNewProduct({
      ...newProduct,
      isOrder: e.target.value === "true",
    });
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    const error = validate(newProduct);

    if (error !== "") {
      notifyError(error);
      return;
    }

    try {
      let response = await dispatch(createProduct(newProduct));
      console.log("hola", response);
      if (response.type) {
        setNewProduct({
          name: "",
          price: "",
          description: "",
          image: "",
          modifiers: [],
          FilterTags: [],
          isOrder: true,
          stock: "",
          state: true,
          paymentTerm: "",
        });
        setTags([]);
        setIsOrder(true);
        setTimeout(() => setCreationDiv(false), 2000);
        dispatch(getProducts(userInfoFirestore.isAdmin));
        notify("Producto creado");
      }
    } catch (error) {
      notifyError("No se pudo cargar el producto");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={confirmHandler}
        className="form__user form-create-product"
      >
        <h3 className="form__title">Crear producto</h3>
        <div className="form__content-alta">
          <div className="form__product-inputs">
            <div>
              <ProductProperties
                newProduct={newProduct}
                handleSetNewProductProperties={handleSetNewProductProperties}
                setNewProduct={setNewProduct}
              />
            </div>
            <div>
              <Modifiers
                setNewProduct={setNewProduct}
                newProduct={newProduct}
                handleSetNewProductProperties={handleSetNewProductProperties}
              />
            </div>
            <div>
              <Labels
                setNewProduct={setNewProduct}
                newProduct={newProduct}
                handleTags={handleTags}
                tags={tags}
                deleteTag={deleteTag}
              />
              <ProductStock
                onHandler={OrderOrStockHanlde}
                isOrder={isOrder}
                newProduct={newProduct}
                onHandlerNewProd={handleSetNewProductProperties}
              />
            </div>
          </div>
        </div>
        <div className="create__product-button">
          <button type="submit" className="form__btn-alta add-btn">
            Crear
          </button>

          <button
            className="form__btn-alta delete-btn"
            onClick={() => {
              setCreationDiv(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
