import React from "react";
import "./DebtCard.css";

function DebtCard({ orders }) {
  const paymentDate = (term) => {
    var options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const day = new Date();
    day.setDate(day.getDate() + Number(term));
    const array = day.toLocaleDateString("es-US", options).split("/");
    const formatedDate = [array[2], array[1], array[0]].join("-");
    return formatedDate;
  };
  

  return (
    <>
      <ul className="card__debt">
        <li className="card-header">
          <h2 className="card-header-title">Total:</h2>
          <ul className="card-header-status list-inline">
            <li className="card-price">
              $ {orders?.map((i) => i.deuda).reduce((a, b) => a + b)}
            </li>
          </ul>
        </li>
        {orders?.map((debt, i) => {
          return (
            <>
              <li className="card-item card-loss" key={i}>
                <h3 className="card-title">{debt.motivo}</h3>

                <p className="card-info card-overdue">Vence: {paymentDate(debt.vto)}</p>

                <ul className="list-inline card-menu left">
                  <li className="card-menu-item">Pagar |</li>
                  <li className="card-menu-item">Ver detalle</li>
                </ul>

                <h4 className="card-price right">$ {debt.deuda}</h4>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default DebtCard;
