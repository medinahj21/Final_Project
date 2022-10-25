import { useDispatch, useSelector } from "react-redux";
import {
  incrementProductInCart,
  decrementProductInCart,
} from "../../redux/actions/shoppingCart";

export default function CartProduct(prod) {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const product =allProducts?.find((product)=> product.id === prod.prod.product.id);

  const{
    id,
    name,
    price
  } = {...product}

  const handleIncrementProduct = (id,modifiers) => {
    dispatch(incrementProductInCart(id,modifiers));
  };

  const handleDecrementProduct = (id,modifiers) => {
    dispatch(decrementProductInCart(id,modifiers));
  };

  return (
    <div className="cart-container-prod">
      <div className="cart-content">
        <h4 className="cart__product-title">{name}</h4>
        <span>$ {price}</span>
        <h3> Detalles: </h3>
        {
          Object.keys(prod.prod.product.modifiers)?.map((key)=>{
            return(
              <>
                <label>
                  {key} : {prod.prod.product.modifiers[key]} {" "} 
                </label>
              </>
            )
          })
        }
        <span>Cantidad: {prod.prod.quant}</span>
        <div className="cart__container-button">
          <button
            className="modify__button modify__button-cart"
            onClick={() => handleDecrementProduct(id, prod.prod.product.modifiers)}
          >
            {" "}
            -{" "}
          </button>
          <button
            className="modify__button  modify__button-cart"
            onClick={() => handleIncrementProduct(id, prod.prod.product.modifiers)}
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>
      <h4>Subtotal: ${prod.prod.quant * price}</h4>
    </div>
  );
}
