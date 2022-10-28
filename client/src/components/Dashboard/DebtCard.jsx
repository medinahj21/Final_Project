import React from "react";
import "./DebtCard.css";

function DebtCard({ month, orders }) {
  return (
    <>
      <ul className="card__debt">
        <li className="card-header">
          <h2 className="card-header-title">{month}</h2>

          <ul className="card-header-status list-inline">
            <li className="card-price">
              $ {orders?.map((i) => i.deuda).reduce((a, b) => a + b)}
            </li>
          </ul>
        </li>
        {orders?.map((debt, i) => {
          return (
            <>
              <li className="card-item card-loss" key={Math.random() * 500 + i}>
                <h3 className="card-title">{debt.motivo}</h3>

                <p className="card-info card-overdue">Vence: {debt.vto}</p>

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
