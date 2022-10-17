import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createProduct, getFilterTags, updateProduct } from "../../redux/actions/products";
import Labels from "./Labels";
import Modifiers from "./Modifiers";
import ProductProperties from "./ProductProperties";
import ProductStock from "./ProductStock";

export default function CreateProduct({isCreate}) {

  const {id}= useParams();

  const initialState = useSelector((state) => state.productsReducer.productDetail)[0];
  const {name , image, price, description, filterTags, initialIsOrder, state, paymentTerm,stock} = {...initialState}

  const dispatch = useDispatch();
  const allFilterTags = useSelector((state) => state.productsReducer.filterTags);
  const [tags, setTags] = useState(initialState?filterTags.map((obj)=>obj.id): []);
  const [isOrder, setIsOrder] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: initialState?name :"",
    price: initialState?price: 0,
    description: initialState?description: "",
    image: initialState?image: "",
    modifiers: [],
    FilterTags: initialState?filterTags.map((obj)=>obj.id): [],
    isOrder: initialState?initialIsOrder: true,
    stock: initialState?stock: 0,
    state: initialState?state: true,
    paymentTerm: initialState?paymentTerm: 0,
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

  const confirmHandler = async (e) => {
    e.preventDefault();

    try {
    if(isCreate){
      let response = await dispatch(createProduct(newProduct));
      if (response.type) {
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

      alert("producto creado");
    }}
    else{
      dispatch(updateProduct(id,newProduct))
      alert("Producto modificado")
    }
      
    } catch (error) {
      alert(`Parece que algo ha malido sal`)
    }

    
  };

  return (
    <form>
      <ProductProperties
        newProduct={newProduct}
        handleSetNewProductProperties={handleSetNewProductProperties}
        setNewProduct={setNewProduct}
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
        filterTags={allFilterTags}
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
        Confirmar producto
      </button>
      <p>{JSON.stringify(newProduct)}</p>
    </form>
  );
}
