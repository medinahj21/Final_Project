import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanProductDetail,
  getProductDetail,
} from "../../../redux/actions/products";

import CreateProduct from "../CreateProducts/CreateProduct";
import ShowProductDetail from "./ShowProductDetail";

import "./ShowProductDetail.css";

export default function ProductDetail({ id, setShowDetail }) {
  const dispatch = useDispatch();
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const [editor, setEditor] = useState(false);
  let editMode = false;

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id, editor]);

  useEffect(() => {
    return () => dispatch(cleanProductDetail());
  }, [dispatch]);

  return (
    <>
      {!editor && (
        <div className="productDetail__container">
          <button onClick={() => setShowDetail(false)}> X </button>
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
          <ShowProductDetail id={id} />
        </div>
      )}
      {userInfoFirestore.isAdmin && editor && (
        <>
          <CreateProduct isCreate={false} />
          <button
            className="detail_edit-product"
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
