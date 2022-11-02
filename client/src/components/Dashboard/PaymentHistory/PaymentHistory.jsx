import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import { notify } from "../../../utils/toastify";
import DebtCard from "../DebtCard";

export default function PaymentHistory() {
  // const location = useLocation();

  const { playerDetail } = useSelector((state) => state.playerReducer);

  const [allOrders, setAllOrders] = useState([]);
  const [formatOrders, setFormatOrders] = useState([]);
  // const [paymentStatus, setPaymenStatus] = useState(false);

  // useEffect(() => {
  //   setPaymenStatus(
  //     location.search.split("&").filter((d) => d.includes("status"))
  //   );
  // }, [location.search]);

  const getOrders = async () => {
    if (!allOrders.length) {
      const ordersDB = await axios(
        `${axios.defaults.baseURL}/orders/player/${playerDetail.id}?state=Paid`
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
          payment_date: order.payment_date?.toString().split("T")[0],
        };
      });
      setFormatOrders(formated);
    }
  };

  // const paymentDate = () => {
  //   var options = { year: "numeric", month: "2-digit", day: "2-digit" };
  //   const day = new Date();
  //   const array = day.toLocaleDateString("es-US", options).split("/");
  //   const formatedDate = [array[2], array[1], array[0]].join("-");
  //   return formatedDate;
  // };

  // console.log("loca", location);
  // console.log(paymentStatus[0]?.includes("approved"));
  // if (location.hash && paymentStatus[0]?.includes("approved")) {
  //   notify("Pago realizado");
  //   let response = axios.put(
  //     `${axios.defaults.baseURL}/orders/${location.hash}`,
  //     {
  //       payment_date: paymentDate(),
  //       order_state: "Paid",
  //     }
  //   );
  //   response.then((res) => window.location.reload());
  // }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {allOrders?.length ? (
        <DebtCard orders={formatOrders} />
      ) : (
        <p>No hay deudas</p>
      )}
    </>
  );
}
