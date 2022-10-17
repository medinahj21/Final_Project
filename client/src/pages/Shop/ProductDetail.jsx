import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  cleanProductDetail,
  getProductDetail,
} from "../../redux/actions/products";
import CreateProduct from "./CreateProduct";
import ShowProductDetail from "./ShowProductDetail";

export default function ProductDetail() {
  let { id } = useParams();

  const dispatch = useDispatch();

  const [editor, setEditor] = useState(false);
  let editMode = false;

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id,editor]);

  useEffect(() => {
    return () => dispatch(cleanProductDetail());
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={() => {
          editMode = !editMode;
          setEditor(editMode);
        }}
      >{!editor?"Editar":"Ver detalle"}</button>
      {editor ? <CreateProduct isCreate={false} /> : <ShowProductDetail />}
    </div>
  );
}
