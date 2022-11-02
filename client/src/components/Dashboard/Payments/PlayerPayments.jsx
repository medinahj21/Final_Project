import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../../../utils/toastify";

import DebtCard from "../DebtCard";

export default function PlayerPayments() {
  const location = useLocation();

  const [allOrders, setAllOrders] = useState([]);
  const [formatOrders, setFormatOrders] = useState([]);
  const [paymentStatus, setPaymenStatus] = useState(false);

  const { playerDetail } = useSelector((state) => state.playerReducer);

  const getOrders = async () => {
    if (!allOrders.length) {
      const ordersDB = await axios(
        `${axios.defaults.baseURL}/orders/player/${playerDetail.id}?state=Pending`
      );
      console.log(ordersDB);
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

  useEffect(() => {
    setPaymenStatus(
      location.hash?.split("&").filter((d) => d.includes("status"))
    );
  }, [location.hash]);

  console.log(paymentStatus);

  const paymentDate = () => {
    var options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const day = new Date();
    const array = day.toLocaleDateString("es-US", options).split("/");
    const formatedDate = [array[2], array[1], array[0]].join("-");
    return formatedDate;
  };

  if (location.hash && paymentStatus[0]?.includes("approved")) {
    let hash = location.hash?.split("?")[0]?.split("#")[1];
    notify("Pago realizado");
    axios.put(`${axios.defaults.baseURL}/orders/update/${hash}`, {
      payment_date: paymentDate(),
      order_state: "Paid",
    });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {allOrders?.length ? (
        <>
          <ToastContainer />
          <DebtCard orders={formatOrders} />
        </>
      ) : (
        <p>No hay deudas</p>
      )}
    </>
  );
}
