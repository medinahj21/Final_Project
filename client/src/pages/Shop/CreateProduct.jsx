import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createProduct, getFilterTags } from "../../redux/actions/products";
import Labels from "./Labels";
import Modifiers from "./Modifiers";
import ProductProperties from "./ProductProperties";
import ProductStock from "./ProductStock";

import { validate } from "./utils/validate";

import "./CreateProduct.css";

export default function CreateProduct({ setCreationDiv }) {
  const dispatch = useDispatch();
  const filterTags = useSelector((state) => state.productsReducer.filterTags);
  const [tags, setTags] = useState([]);
  const [isOrder, setIsOrder] = useState(true);
  const [error, setError] = useState("");
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
      setError(error);
      return;
    }
    try {
      let response = await dispatch(createProduct(newProduct));
      if (response?.type) {
        setNewProduct({
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
        setTags([]);
        setIsOrder(true);
        setCreationDiv(false);
        alert("¿Usuario creado?");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form__product">
      <button
        onClick={() => {
          setCreationDiv(false);
        }}
      >
        Cerrar
      </button>
      {error === "" ? <></> : <p className="product__input-error">{error}</p>}
      <ProductProperties
        newProduct={newProduct}
        handleSetNewProductProperties={handleSetNewProductProperties}
        setNewProduct={setNewProduct}
      />
      <Modifiers
        setNewProduct={setNewProduct}
        newProduct={newProduct}
        handleSetNewProductProperties={handleSetNewProductProperties}
      />
      <Labels
        handleTags={handleTags}
        filterTags={filterTags}
        tags={tags}
        deleteTag={deleteTag}
      />
      <ProductStock
        onHandler={OrderOrStockHanlde}
        isOrder={isOrder}
        newProduct={newProduct}
        onHandlerNewProd={handleSetNewProductProperties}
      />
      <button type="submit" onClick={confirmHandler}>
        Confirmar creación de producto
      </button>
    </form>
  );
}
