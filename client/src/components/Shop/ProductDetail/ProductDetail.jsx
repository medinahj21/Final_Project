import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanProductDetail,
  getProductDetail,
  getProducts,
  updateProduct,
} from "../../../redux/actions/products";

import CreateProduct from "../CreateProducts/CreateProduct";
import ShowProductDetail from "./ShowProductDetail";

import "./ShowProductDetail.css";

export default function ProductDetail({ id, setShowDetail }) {
  const dispatch = useDispatch();
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const prodDetail= useSelector((state)=> state.productsReducer.productDetail)[0];
  //console.log(prodDetail.state)

  const [editor, setEditor] = useState(false);
  let editMode = false;



  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => dispatch(cleanProductDetail());
  }, [dispatch]);

  const handleSetProductState= (id) => {    
    dispatch(updateProduct(id, {state: !prodDetail.state}));
    dispatch(getProducts());
    dispatch(getProductDetail(id));
  }

  return (
    <>
      {!editor && (
        <div className="productDetail__container">
          <span className="productDetail__container-span"></span>
          <button className="close-detail" onClick={() => setShowDetail(false)}>
            {" "}
            X{" "}
          </button>
          {userInfoFirestore.isAdmin && (
            <button
              onClick={() => {
                editMode = !editMode;
                setEditor(editMode);
              }}
            >
              Editar
            </button>
          )}
          {userInfoFirestore.isAdmin && (
            <div className="toggle checkcross" onClick={()=> handleSetProductState(id)}>
              <input id="checkcross" type="checkbox" />
              <label className="toggle-item" htmlFor="checkcross">
                <div className="check"></div>
              </label>
            </div>
          )}
          <ShowProductDetail id={id} />
        </div>
      )}
      {userInfoFirestore.isAdmin && editor && (
        <>
          <CreateProduct isCreate={false} />
          <button
            className="modify__button detail_edit-product"
            onClick={() => {
              editMode = !editMode;
              setEditor(editMode);
            }}
          >
            Ver detalle
          </button>
        </>
      )}
    </>
  );
}
