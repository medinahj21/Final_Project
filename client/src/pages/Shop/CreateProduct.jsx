import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, getFilterTags } from "../../redux/actions/products";
import Modifiers from "./Modifiers";
import Tags from "./Tags";

export default function CreateProduct() {
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);
  const cbTags = (valor) => {
    setTags(valor);
    setNewProduct({
      ...newProduct,
      FilterTags: valor,
    });
  };

  const [modifiers, setModifiers] = useState([]);
  const cbModifiers = (valor) => {
    setModifiers(valor);
    setNewProduct({
      ...newProduct,
      modifiers: [...modifiers, valor],
    });
  };

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

  const handleSetNewProductProperties = (e) => {
    e.preventDefault();
    setNewProduct({
      ...newProduct,
      [e.target.name]: isNaN(e.target.value)
        ? e.target.value
        : Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let answer = await dispatch(createProduct(newProduct));
    if (answer.type) {
      alert("Producto creado");
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
      setModifiers([]);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label> Nombre producto: </label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={(e) => {
              handleSetNewProductProperties(e);
            }}
          ></input>
        </div>
        <hr />
        <div>
          <label> Imagen: </label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={(e) => {
              handleSetNewProductProperties(e);
            }}
          ></input>
        </div>
        <hr />
        <div>
          <label> Precio: </label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={(e) => {
              handleSetNewProductProperties(e);
            }}
          ></input>
        </div>
        <hr />
        <div>
          <label> Descripción: </label>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={(e) => {
              handleSetNewProductProperties(e);
            }}
          ></input>
        </div>
        <hr />
        <div>
          <Modifiers callback={cbModifiers} modifiers={modifiers} />
        </div>
        <hr />
        <div>
          <label> Días de plazo para el pago: </label>
          <input
            type="number"
            name="paymentTerm"
            value={newProduct.paymentTerm}
            onChange={(e) => {
              handleSetNewProductProperties(e);
            }}
          ></input>
        </div>
        <hr />
        <div>
          <Tags callback={cbTags} tags={tags} />
        </div>
        <hr />
        <div>
          <label> Producto bajo pedido o bajo stock </label>
          <select
            onChange={(e) => {
              setIsOrder(e.target.value);
              setNewProduct({
                ...newProduct,
                isOrder: e.target.value === "true",
              });
            }}
          >
            <option value={-1} disabled={true}>
              {"tipo de producto"}
            </option>
            <option value={true}>{"bajo pedido"}</option>
            <option value={false}>{"bajo stock"}</option>
          </select>
          <div>
            {isOrder === "false" ? (
              <div>
                <label>Existencias</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={(e) => {
                    handleSetNewProductProperties(e);
                  }}
                ></input>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <hr />

        <button type="submit">Confirmar creación de producto</button>
      </form>
    </div>
  );
}
