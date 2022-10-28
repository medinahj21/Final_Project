import axios from "axios";
import { useState } from "react";
import DebtCard from "../DebtCard";

export default function PlayerPayments() {
  const [allOrders, setAllOrders] = useState([]);
  const [formatOrders, setFormatOrders] = useState([]);

  const getOrders = async () => {
    if (!allOrders.length) {
      const ordersDB = await axios(`${axios.defaults.baseURL}/orders`);
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
  
  return (
    <>
      <h1>Órdenes</h1>
      <button onClick={getOrders}> Traer órdenes</button>
      {allOrders?.length ? (
        <DebtCard month={"Noviembre"} orders={formatOrders} />
      ) : (
        <p>No hay deudas</p>
      )}
    </>
  );
}
