import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createProduct, getFilterTags } from "../../redux/actions/products";

export default function CreateProduct() {
  const dispatch = useDispatch();

  const filterTags = useSelector((state) => state.productsReducer.filterTags);

  const [tags, setTags] = useState([]);

  const [addModifier, setAddModifier] = useState(false);
  const [newModifierType, setNewModifierType] = useState("");
  const [newModifierProperty, setNewModifierProperty] = useState("");
  const [enableOptions, setEnableOptions] = useState(false);
  const [newModifierValue, setNewModifierValue] = useState("");
  const [newModifier, setNeWModifier] = useState([]);
  const [disableAddModifier, setDisableAddModifier] = useState(true);
  const [modifiers, setModifiers] = useState([]);

  const [isOrder, setIsOrder] = useState(true);

  const [newProduct, setNewProduct] = useState(
    {
        name : "",
        price: 0,
        description: "",
        image:"",
        modifiers: [],
        FilterTags: [],
        isOrder: true,
        stock: 0,
        state: true,
        paymentTerm: 0,
    }
  )


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
        FilterTags: [...tags, Number(e.target.value)]
    })
  };
  const deleteTag = (e) => {
    let aux = tags;
    aux.splice(tags.indexOf(Number(e.target.value)), 1);
    setTags([...aux]);
    setNewProduct({
        ...newProduct,
        FilterTags: aux
    })
  };

  const handleSetNewProductProperties = (e)=>{
    e.preventDefault();
    setNewProduct({
        ...newProduct,
        [e.target.name]:isNaN(e.target.value) ? e.target.value: Number(e.target.value)
    })
  }

  return (
    <div>
      <form>
        <div>
          <label> Nombre producto: </label>
          <input type="text" name="name" value={newProduct.name} onChange={(e)=>{handleSetNewProductProperties(e)}}></input>
        </div>
                                            <hr />
        <div>
          <label> Imagen: </label>
          <input type="text" name="image" value={newProduct.image} onChange={(e)=>{handleSetNewProductProperties(e)}}></input>
        </div>
                                            <hr />
        <div>
          <label> Precio: </label>
          <input type="number" name="price" value={newProduct.price} onChange={(e)=>{handleSetNewProductProperties(e)}} ></input>
        </div>
                                            <hr />        
        <div>
          <label> Descripción: </label>
          <input type="text" name="description" value={newProduct.description} onChange={(e)=>{handleSetNewProductProperties(e)}}></input>
        </div>
                                            <hr />        
        <div>
        <label> Modificadores: </label>
        <div>
            <button
            onClick={(e) => {
                e.preventDefault();
                setAddModifier(true);
            }}
            >
            {" "}
            Nuevo modificador ➕
            </button>
        </div>
        {addModifier ? (
            <div>
            <label> Tipo: </label>
            <select
                value={0}
                onChange={(e) => setNewModifierType(e.target.value)}
            >
                <option value={0} disabled={true}>
                {" "}
                selecciona tipo
                </option>
                <option value={"opciones"}>{"Opciones"}</option>
                <option value={"campoDeTexto"}>{"Campo de texto"}</option>
            </select>
            </div>
        ) : (
            <p></p>
        )}
        {newModifierType === "opciones" && addModifier ? (
            <div>
            <h1>opciones</h1>
            <label> Nombre: </label>
            <input
                onChange={(e) => {
                e.preventDefault();
                setNewModifierProperty(e.target.value);
                }}
            ></input>
            <button
                onClick={(e) => {
                e.preventDefault();
                setEnableOptions(true);
                setNeWModifier({ [newModifierProperty]: [] });
                }}
            >
                Confirmar nombre y agregar opciones
            </button>
            {enableOptions ? (
                <div>
                <label>nueva opción</label>
                <input
                    value={newModifierValue}
                    onChange={(e) => {
                    e.preventDefault();
                    setNewModifierValue(e.target.value);
                    }}
                ></input>
                <button
                    onClick={(e) => {
                    e.preventDefault();
                    setNeWModifier({
                        [newModifierProperty]: [
                        ...newModifier[newModifierProperty],
                        newModifierValue,
                        ],
                    });
                    setDisableAddModifier(false);
                    setNewModifierValue("");
                    }}
                >
                    {" "}
                    agregar opción{" "}
                </button>
                <p> nuevo modificador vista previa: {JSON.stringify(newModifier)}</p>
                </div>
            ) : (
                <p>Confirma nombre para agregar opciones</p>
            )}
            </div>
        ) : newModifierType === "campoDeTexto" ? (
            <div>
            <h1>Texto</h1>
            <label> Nombre: </label>
            <input
                onChange={(e) => {
                e.preventDefault();
                setNewModifierProperty(e.target.value);
                }}
            ></input>
            <button
                onClick={(e) => {
                e.preventDefault();
                setDisableAddModifier(false);
                setNeWModifier({ [newModifierProperty]: "" });
                }}
            >
                ver vista previa de modificador de texto
            </button>
            <p> nuevo modificador vista previa: {JSON.stringify(newModifier)}</p>
            </div>
        ) : (
            <p></p>
        )}
        {!disableAddModifier ? (
            <div>
                <button
            disabled={disableAddModifier}
            onClick={(e) => {
                e.preventDefault();
                setAddModifier(false);
                setModifiers([...modifiers, newModifier]);
                setNeWModifier({});
                setNewModifierType("");
                setDisableAddModifier(true);
                setNewProduct({
                    ...newProduct,
                    modifiers: [...modifiers, newModifier]
                })
            }}
            >
            {" "}
            Añadir nuevo modificador{" "}
            </button>
            <button
            onClick={(e)=>{
                e.preventDefault();
                setNeWModifier({});
                setNewModifierType("");
                setNewModifierProperty("");
                setDisableAddModifier(true);                
            }}
            >
                Resetear nuevo modificador
            </button>

            </div>
            
        ) : (
            <p></p>
        )}
        <p>Modificadores producto:{JSON.stringify(modifiers)}</p>
        </div>
                                            <hr />
        <div>
          <label> Días de plazo para el pago: </label>
          <input type="number" name="paymentTerm" value={newProduct.payment_term} onChange={(e)=>{handleSetNewProductProperties(e)}}></input>
        </div>
                                            <hr />
        <div>
          <label> Etiquetas </label>
          <select
            name="Tags"
            value={0}
            onChange={(e) => {
              handleTags(e);
            }}
          >
            <option value={0}> selecciona etiquetas </option>
            {filterTags?.map((tag) => {
              return (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              );
            })}
          </select>
          {tags.length > 0 ? (
            <div>
              <ul>
                {tags?.map((tagId) => {
                  return (
                    <li
                      key={tagId}
                      value={tagId}
                      onClick={(e) => {
                        deleteTag(e);
                      }}
                    >
                      {filterTags.find((t) => t.id === Number(tagId)).name} ❌
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p>no hay etiquetas aún</p>
          )}
        </div>
                                            <hr />
        <div>
            <label> Producto bajo pedido o bajo stock </label>
            <select value={-1} onChange={(e)=>{setIsOrder(e.target.value) ; setNewProduct({...newProduct, isOrder: (e.target.value==="true")})}}>
                <option value={-1} disabled={true}>{"tipo de producto"}</option>
                <option value={true}>{"bajo pedido"}</option>
                <option value={false}>{"bajo stock"}</option>
            </select>
            <div>
            {
                isOrder=== "false"?
                <div>
                    <label>Existencias</label>
                    <input type="number" name="stock" value={newProduct.stock} onChange={(e)=>{handleSetNewProductProperties(e)}}></input>
                </div>                  
                :
                <p></p>

            }
            </div>            
        </div>

        <hr />

        <button type="submit" onClick={(e)=>{e.preventDefault(); dispatch(createProduct(newProduct))}}> Confirmar creación de producto </button>


      </form>
    </div>
  );
}
