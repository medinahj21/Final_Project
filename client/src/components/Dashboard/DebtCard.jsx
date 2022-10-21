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
    motivo: "Adny gato",
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
      <ul class="card__debt">
        <li class="card-header">
          <h2 class="card-header-title">{month}</h2>

          <ul class="card-header-status list-inline">
            <li class="card-price">$ {total}</li>
          </ul>
        </li>
        {deudas.map((debt) => {
          return (
            <>
              <li class="card-item card-loss">
                <h3 class="card-title">{debt.motivo}</h3>

                <p class="card-info card-overdue">Vence: {debt.vto}</p>

                <ul class="list-inline card-menu left">
                  <li class="card-menu-item">Pagar |</li>
                  <li class="card-menu-item">Ver detalle</li>
                </ul>

                <h4 class="card-price right">$ {debt.deuda}</h4>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default DebtCard;

// <div className="debts__container">
//   <div className="container__debt-total">
//     <div className="debt__top">
//       <h4>Deuda Total</h4>
//       <span className="debt__total">$ {total}</span>
//     </div>
//     <ul>
//       {deudas.map((deuda, i) => {
//         return <li key={i}>{deuda.motivo}</li>;
//       })}
//     </ul>
//     <button className="debt__total-btn">Pagar</button>
//     {/* <div className="debt__total">
//       <h3 className="debt__title">Deuda total</h3>
//       <span>{total}</span>
//     </div>
//     <button>Pagar</button> */}
//   </div>
//   <div className="container__debt-info">
//     {deudas?.map((deuda) => {
//       return (
//         <div className="debt__info">
//           <h4>{deuda.motivo}</h4>
//           <span>${deuda.deuda}</span>
//           <button>pagar</button>
//           <button>detalle</button>
//         </div>
//       );
//     })}
//   </div>
// </div>
