import React from "react";
import "./DebtCard.css";

const deudas = [
  { deuda: 200000, motivo: "Cuota de miembro", vto: "8-1-2023" },
  {
    deuda: 40000,
    motivo: "Camisa de hombre",
    vto: "5-11-2022",
  },
  {
    deuda: 40000,
    motivo: "Deuda de prueba",
    vto: "10-12-2022",
  },
];

const debt = deudas.map((deuda) => {
  return deuda.deuda;
});

const total = debt.reduce((prev, current) => {
  return prev + current;
});

function DebtCard({ month }) {
  return (
    <>
      <ul className="card__debt">
        <li className="card-header">
          <h2 className="card-header-title">{month}</h2>

          <ul className="card-header-status list-inline">
            <li className="card-price">$ {total}</li>
          </ul>
        </li>
        {deudas.map((debt) => {
          return (
            <>
              <li className="card-item card-loss">
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

// <div classNameName="debts__container">
//   <div classNameName="container__debt-total">
//     <div classNameName="debt__top">
//       <h4>Deuda Total</h4>
//       <span classNameName="debt__total">$ {total}</span>
//     </div>
//     <ul>
//       {deudas.map((deuda, i) => {
//         return <li key={i}>{deuda.motivo}</li>;
//       })}
//     </ul>
//     <button classNameName="debt__total-btn">Pagar</button>
//     {/* <div classNameName="debt__total">
//       <h3 classNameName="debt__title">Deuda total</h3>
//       <span>{total}</span>
//     </div>
//     <button>Pagar</button> */}
//   </div>
//   <div classNameName="container__debt-info">
//     {deudas?.map((deuda) => {
//       return (
//         <div classNameName="debt__info">
//           <h4>{deuda.motivo}</h4>
//           <span>${deuda.deuda}</span>
//           <button>pagar</button>
//           <button>detalle</button>
//         </div>
//       );
//     })}
//   </div>
// </div>
