import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, getFilterTags } from "../../redux/actions/products";
import Labels from "./Labels";
import Modifiers from "./Modifiers";
import ProductProperties from "./ProductProperties";
import ProductStock from "./ProductStock";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const filterTags = useSelector((state) => state.productsReducer.filterTags);
  const [tags, setTags] = useState([]);
  const [isOrder, setIsOrder] = useState(true);
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
  };

  const OrderOrStockHanlde = (e) => {
    e.preventDefault();
    setIsOrder(e.target.value);
    setNewProduct({
      ...newProduct,
      isOrder: e.target.value === "true",
    });
  };

  const confirmHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(newProduct));
  };

  return (
    <form>
      <ProductProperties
        newProduct={newProduct}
        handleSetNewProductProperties={handleSetNewProductProperties}
      />

      <hr />
      <Modifiers
        setNewProduct={setNewProduct}
        newProduct={newProduct}
        handleSetNewProductProperties={handleSetNewProductProperties}
      />
      <hr />
      <Labels
        handleTags={handleTags}
        filterTags={filterTags}
        tags={tags}
        deleteTag={deleteTag}
      />
      <hr />
      <ProductStock
        onHandler={OrderOrStockHanlde}
        isOrder={isOrder}
        newProduct={newProduct}
        onHandlerNewProd={handleSetNewProductProperties}
      />
      <hr />

      <button type="submit" onClick={confirmHandler}>
        {" "}
        Confirmar creación de producto{" "}
      </button>
    </form>
  );
}
