import React from "react";

const deudas = [
  { deuda: 200000, motivo: "cuota de miembro" },
  {
    deuda: 40000,
    motivo: "caminsa de hombre",
  },
  {
    deuda: 40000,
    motivo: "pantaloneta",
  },
];

const debt = deudas.map((deuda) => {
  return deuda.deuda;
});

const total = debt.reduce((prev, current) => {
  return prev + current;
});

function DebtCard() {
  return (
    <div className="debts__container">
      <div className="container__debt-total">
        <div className="debt__top">
          <h4>Deuda Total</h4>
          <span className="debt__total">$ {total}</span>
        </div>
        <ul>
          {deudas.map((deuda, i) => {
            return <li key={i}>{deuda.motivo}</li>;
          })}
        </ul>
        <button className="debt__total-btn">Pagar</button>
        {/* <div className="debt__total">
          <h3 className="debt__title">Deuda total</h3>
          <span>{total}</span>
        </div>
        <button>Pagar</button> */}
      </div>
      <div className="container__debt-info">
        {deudas?.map((deuda) => {
          return (
            <div className="debt__info">
              <h4>{deuda.motivo}</h4>
              <span>${deuda.deuda}</span>
              <button>pagar</button>
              <button>detalle</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DebtCard;
