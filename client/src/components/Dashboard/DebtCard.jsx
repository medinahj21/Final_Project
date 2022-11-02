import { useDispatch, useSelector } from "react-redux";

import { getPreference } from "../../redux/actions/shoppingCart";

import "./DebtCard.css";

function DebtCard({ orders }) {
  const dispatch = useDispatch();

  const { clickChoicePersist } = useSelector((state) => state.authReducer);

  const setMercadoPagoButton = async (order) => {
    let idCart = [
      {
        id: order.id,
        title: order.title,
        description: order.description,
        quantity: 1,
        unit_price: order.unit_price,
      },
    ];

    const preference = await dispatch(getPreference(idCart.flat(), "app",order.id ));
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preference.data.preferenceId);
    const button = document.getElementById(order.id);
    button.innerHTML = "";
    button.appendChild(script);
  };

  return (
    <>
      <ul className="card__debt">
        <li className="card-header">
          {!clickChoicePersist.isPagosHistory && (
            <>
              <h2 className="card-header-title">Total</h2>
              <ul className="card-header-status list-inline">
                <li className="card-price">
                  $ {orders?.map((i) => i.deuda).reduce((a, b) => a + b)}
                </li>
              </ul>
            </>
          )}
        </li>
        {orders?.map((debt, i) => {
          setMercadoPagoButton(debt);
          return (
            <>
              <li
                className={
                  !clickChoicePersist.isPagosHistory
                    ? "card-item card-loss"
                    : "card-item card-win card-widht"
                }
                key={i}
              >
                <h3 className="card-title">{debt.motivo}</h3>
                {clickChoicePersist.isPagosHistory && (
                  <span>Fecha de pago: {debt.payment_date}</span>
                )}
                <h4 className="card-price right">$ {debt.deuda}</h4>
                {!clickChoicePersist.isPagosHistory && (
                  <div id={debt.id}>Loading...</div>
                )}
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default DebtCard;
