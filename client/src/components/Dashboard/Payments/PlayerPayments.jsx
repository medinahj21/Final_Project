import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import DebtCard from "../DebtCard";

export default function PlayerPayments() {
  const [allOrders, setAllOrders] = useState([]);
  const [formatOrders, setFormatOrders] = useState([]);

  const { playerDetail } = useSelector((state) => state.playerReducer);

  const getOrders = async () => {
    if (!allOrders.length) {
      const ordersDB = await axios(
        `${axios.defaults.baseURL}/orders/player/${playerDetail.id}`
      );
      setAllOrders([...ordersDB.data]);
      const formated = ordersDB.data.map((order) => {
        return {
          deuda: Number(order.value),
          motivo: order.concept,
          vto: order.payment_term.toString().split("T")[0],
          id: order.id,
          title: order.concept,
          description: order.description,
          quantity: 1,
          unit_price: order.value,
        };
      });
      setFormatOrders(formated);
    }
  };

  return (
    <>
      <h1>Órdenes</h1>
      <button onClick={getOrders}> Traer órdenes</button>
      {/* <h2> Pagar toda la deuda ahora</h2>
      <button id="checkout"> prueba</button> */}
      {allOrders?.length ? (
        <DebtCard orders={formatOrders} />
      ) : (
        <p>No hay deudas</p>
      )}
    </>
  );
}
