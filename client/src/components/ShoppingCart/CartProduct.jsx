import { useDispatch, useSelector } from "react-redux";
import {
  incrementProductInCart,
  decrementProductInCart,
} from "../../redux/actions/shoppingCart";

export default function ShoppingCart(prod) {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const product =allProducts?.find((product)=> product.id === prod.prod.product.id);
  console.log("producto encontrado:", product)

  const{
    id,
    name,
    price
  } = {...product}

  const handleIncrementProduct = (id) => {
    dispatch(incrementProductInCart(id));
  };

  const handleDecrementProduct = (id) => {
    dispatch(decrementProductInCart(id));
  };

  console.log(prod)

  return (
    <div>
      <div>
        <h3>{name}</h3>
        <h3>${price}.00</h3>
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
        <h5>Cantidad: {prod.prod.quant}</h5>
        <button onClick={() => handleDecrementProduct(id)}>
          {" "}
          -{" "}
        </button>
        <button onClick={() => handleIncrementProduct(id)}>
          {" "}
          +{" "}
        </button>
        <h4>Subtotal: ${prod.prod.quant * price}</h4>
      </div>
    </div>
  );
}
