import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { notify, notifyError } from "../../../utils/toastify";

import Labels from "../CreateProducts/Labels";
import Modifiers from "../CreateProducts/Modifiers";
import ProductProperties from "../CreateProducts/ProductProperties";
import ProductStock from "../CreateProducts/ProductStock";

import { ToastContainer } from "react-toastify";

import "../CreateProducts/CreateProduct.css";
import { getProducts, updateProduct } from "../../../redux/actions/products";

export default function UpdateProduct({ setEditor }) {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const initialState = useSelector(
    (state) => state.productsReducer.productDetail
  )[0];
  const {
    // name,
    // image,
    // price,
    // description,
    filterTags,
    // initialIsOrder,
    // state,
    // paymentTerm,
    // stock,
    id,
  } = { ...initialState };

  const dispatch = useDispatch();

  const [tags, setTags] = useState(
    initialState ? filterTags.map((obj) => obj.id) : []
  );

  const [isOrder, setIsOrder] = useState(null);

  const [productUpdate, setProductUpdate] = useState({});

  const handleTags = (e) => {
    if (tags.indexOf(Number(e.target.value)) === -1)
      setTags([...tags, Number(e.target.value)]);
    setProductUpdate({
      ...productUpdate,
      FilterTags: [...tags, Number(e.target.value)],
    });
  };

  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
    setProductUpdate({
      ...productUpdate,
      FilterTags: aux,
    });
  };

  const handleSetNewProductProperties = (e) => {
    e.preventDefault();
    setProductUpdate({
      ...productUpdate,
      [e.target.name]: isNaN(e.target.value)
        ? e.target.value
        : Number(e.target.value),
    });
  };

  const OrderOrStockHanlde = (e) => {
    e.preventDefault();
    setIsOrder(e.target.value);
    setProductUpdate({
      ...productUpdate,
      isOrder: e.target.value === "true",
    });
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    if (!Object.keys(productUpdate).length)
      return notifyError("No has modificado nada aún");
    try {
      dispatch(updateProduct(id, productUpdate));

      setTimeout(() => {
        dispatch(getProducts(userInfoFirestore.isAdmin));
      }, 1000);

      notify("Producto actualizado!");
    } catch (error) {
      notifyError("No ha sido posible actualizar");
    }
  };

  const backDetailHandler = (e) => {
    e.preventDefault();

    setEditor((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={confirmHandler}
        className="form__user form-create-product"
      >
        <h3 className="form__title">Editar producto</h3>
        <div className="form__content-alta">
          <div className="form__product-inputs">
            <div>
              <ProductProperties
                newProduct={productUpdate}
                handleSetNewProductProperties={handleSetNewProductProperties}
                setNewProduct={setProductUpdate}
              />
            </div>
            <div>
              <Modifiers
                setNewProduct={setProductUpdate}
                newProduct={productUpdate}
                handleSetNewProductProperties={handleSetNewProductProperties}
              />
            </div>
            <div>
              <Labels
                setNewProduct={setProductUpdate}
                newProduct={productUpdate}
                handleTags={handleTags}
                tags={tags}
                deleteTag={deleteTag}
              />
              <ProductStock
                onHandler={OrderOrStockHanlde}
                isOrder={isOrder}
                newProduct={productUpdate}
                onHandlerNewProd={handleSetNewProductProperties}
              />
            </div>
          </div>
        </div>
        <div className="create__product-button">
          <button className="detail_edit-product" onClick={backDetailHandler}>
            Ver detalle
          </button>
          <button type="submit" className="form__btn-alta add-btn">
            Editar
          </button>
        </div>
      </form>
    </>
  );
}

// const error = validate(updateProduct);

// if (error !== "") {
//   notifyError(error);
//   return;
// }

// try {
//   if (isCreate) {
//     let response = await dispatch(createProduct(updateProduct));

//     if (response.type) {
//       setUpdateProduct({
//         name: "",
//         price: "",
//         description: "",
//         image: "",
//         modifiers: [],
//         FilterTags: [],
//         isOrder: true,
//         stock: "",
//         state: true,
//         paymentTerm: "",
//       });
//       setTags([]);
//       setIsOrder(true);
//       setTimeout(() => setCreationDiv(false), 2000);

//       notify("Producto creado");
//     }
//   } else {
//     dispatch(updateProduct(id, updateProduct));
//     notify("Producto modificado");
//   }
// } catch (error) {
//   notifyError("No se pudo cargar el producto");
// }
