import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanProductDetail,
  getProductDetail,
  getProducts,
  updateProduct,
} from "../../../redux/actions/products";

import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ShowProductDetail from "./ShowProductDetail";

import "./ShowProductDetail.css";

export default function ProductDetail({ id, setShowDetail }) {
  const dispatch = useDispatch();

  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  const prodDetail = useSelector(
    (state) => state.productsReducer.productDetail
  )[0];

  const [editor, setEditor] = useState(false);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => dispatch(cleanProductDetail());
  }, [dispatch]);

  const handleSetProductState = (id) => {
    dispatch(updateProduct(id, { state: !prodDetail.state }));
    dispatch(getProducts(userInfoFirestore.isAdmin));
    dispatch(getProductDetail(id));
  };

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
              className="close-detail"
              onClick={() => {
                setEditor((prevState) => !prevState);
              }}
            >
              Editar
            </button>
          )}
          <ShowProductDetail handleSetProductState={handleSetProductState} />
        </div>
      )}
      {userInfoFirestore.isAdmin && editor && (
        <>
          <UpdateProduct setEditor={setEditor} />
        </>
      )}
    </>
  );
}
