import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import DebtCard from "../DebtCard";

export default function PlayerPayments() {

  const [allOrders, setAllOrders] = useState([]);
  const [formatOrders, setFormatOrders] = useState([]);

  const {playerDetail} = useSelector((state) => state.playerReducer);

  const getOrders = async () => {
    if (!allOrders.length) {
      const ordersDB = await axios(`${axios.defaults.baseURL}/orders/player/${playerDetail.id}`);
      setAllOrders([...ordersDB.data]);
      const formated = ordersDB.data.map((order) => {
        return {
          deuda: Number(order.value),
          motivo: order.concept,
          vto: order.payment_term.toString().split("T")[0] ,
        };
      });
      setFormatOrders(formated);
    }
  };

  /* const setMercadoPagoButton = async () => {
    let idCart = []

    allOrders.map((pc) => {
      let filtered = allProducts.filter((ap) => ap.id === pc.product.id);
      let fillmap = filtered.map((e) => {
        return {
          id: e.id,
          title: e.name,
          description: e.description,
          picture_url: e.image,
          quantity: pc.quant,
          unit_price: e.price
        }
      })
      idCart.push(fillmap);
    })
      const preference = await dispatch(getPreference(idCart.flat()));
        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js";
        script.setAttribute('data-preference-id', preference.data.preferenceId);
        const button = document.getElementById('checkout');
        button.innerHTML = "";
        button.appendChild(script);
        // setdeleteIcon(false)
  }

  console.log(allOrders); */
  
  return (
    <>
      <h1>Órdenes</h1>
      <button onClick={getOrders}> Traer órdenes</button>
      <h2> Pagar toda la deuda ahora</h2>
      <button id="checkout"> prueba</button>
      {allOrders?.length ? (
        <DebtCard orders={formatOrders} />
      ) : (
        <p>No hay deudas</p>
      )}
    </>
  );
}
