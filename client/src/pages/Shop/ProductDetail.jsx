import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  cleanProductDetail,
  getProductDetail,
} from "../../redux/actions/products";
import CreateProduct from "./CreateProduct";
import ShowProductDetail from "./ShowProductDetail";

import "./ShowProductDetail.css";

<<<<<<< HEAD:client/src/pages/Shop/ProductDetail.jsx
export default function ProductDetail({id, setShowDetail}) {
  // let { id } = useParams();

=======
export default function ProductDetail({ id, setShowDetail }) {
>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd:client/src/components/Shop/ProductDetail/ProductDetail.jsx
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
