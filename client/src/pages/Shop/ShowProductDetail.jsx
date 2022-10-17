import React from "react";
import { useSelector } from "react-redux";

export default function ShowProductDetail() {

    const product = useSelector((state) => state.productsReducer.productDetail)[0];
    const { name, image, price, description, filterTags, modifiers, state, isOrder, stock, paymentTerm } = { ...product };
     
    return(
        <div>
            {product ? (
            <div>
                <div>
                <div>
                    <label>{state? "habilitado":"deshabilitado"}</label>
                    <h1>{name}</h1>
                </div>
                <div>
                    <img alt="imgProduct" src={image} height="300" />
                </div>
                <div>
                    <h3>{`Precio: ${price}`}</h3>
                    <h3>Detalles:</h3>
                    <p>{description}</p>
                    <h4>Etiquetas:</h4>
                    <ul>
                    {
                    filterTags?.map((obj) => {
                        return <li key={obj.id} value={obj.id}>{obj["name"]}</li>;
                    })}
                    </ul>
                </div>
                </div>
                <div>
                    <h3>Modificadores</h3>
                    {
                        modifiers?.map((obj,index)=>{
                            if(Object.values(obj)[0] === ""){
                                return(
                                    <div key={index}>
                                        <label>{Object.keys(obj)[0]}:</label>
                                        <input placeholder={Object.keys(obj)[0]}></input>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div key={index}>
                                        <label>{Object.keys(obj)[0]}:</label>
                                        <select name={Object.keys(obj)[0]} id={index} value={0} readOnly={true}>
                                            <option value={0} disabled={true}>{"selecciona una"}</option>
                                            {
                                                Object.values(obj)[0]?.map((option,i)=>
                                                    <option value={option} key={i} >{option}</option> //cambiar a input type radio
                                                )
                                            }
                                            
                                        </select>
                                        
                                    </div>
                                )                            
                            }
                        })
                    }
                </div>
                <div>
                    <h4>Producto bajo {isOrder?"pedido":"stock"}</h4>
                    {
                        !isOrder?
                        <label>Existencias: {stock}</label>
                        :
                        <p></p>
                    }
                    <h4> Plazo máximo de pago: {paymentTerm} días</h4>
                </div>

            </div>
            ) : (
            <h1>No hay info</h1>
            )}
        </div>
    )
}