import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  createProduct,
  getFilterTags,
  updateProduct,
} from "../../../redux/actions/products";

import { validate } from "../../../utils/validate";

import Labels from "./Labels";
import Modifiers from "./Modifiers";
import ProductProperties from "./ProductProperties";
import ProductStock from "./ProductStock";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CreateProduct.css";

export default function CreateProduct({ isCreate, setCreationDiv }) {
  const notify = (message) => toast.success(message);
  const notifyError = (message) =>
    toast.error(message, {
      hideProgressBar: true,
      theme: "colored",
    });

  const { id } = useParams();

  const initialState = useSelector(
    (state) => state.productsReducer.productDetail
  )[0];
  const {
    name,
    image,
    price,
    description,
    filterTags,
    initialIsOrder,
    state,
    paymentTerm,
    stock,
  } = { ...initialState };

  const dispatch = useDispatch();
  const allFilterTags = useSelector(
    (state) => state.productsReducer.filterTags
  );
  const [tags, setTags] = useState(
    initialState ? filterTags.map((obj) => obj.id) : []
  );
  const [isOrder, setIsOrder] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: initialState ? name : "",
    price: initialState ? price : 0,
    description: initialState ? description : "",
    image: initialState ? image : "",
    modifiers: [],
    FilterTags: initialState ? filterTags.map((obj) => obj.id) : [],
    isOrder: initialState ? initialIsOrder : true,
    stock: initialState ? stock : 0,
    state: initialState ? state : true,
    paymentTerm: initialState ? paymentTerm : 0,
  });

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
      if (isCreate) {
        let response = await dispatch(createProduct(newProduct));

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

          notify("Producto creado");
        }
      } else {
        dispatch(updateProduct(id, newProduct));
        notify("Producto modificado");
      }
    } catch (error) {
      notifyError("No se pudo cargar el producto");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={confirmHandler} className="form__user">
        <h3 className="form__title">{isCreate ? 'Crear producto' : 'Editar producto'}</h3>
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
                filterTags={allFilterTags}
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
