import { useSelector } from "react-redux";
import CartProduct from "./CartProduct"

const ShoppingCart = () => {

  const productsInCart = useSelector((state) => state.shoppingCartReducer.cart);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {productsInCart?.filter((item)=> item.quant !== 0).map((prod, index) => {
        return (
          <CartProduct
            key= {index}
            prod= {prod}
          />
        );
      })}
      <div>
        <h2>Total</h2>
        <h4>
          ${" "}
          {productsInCart?.reduce(
            (a, item) => a + item.product.price * item.quant,
            0
          )}
          .00
        </h4>
      </div>
    </div>
  );
};

export default ShoppingCart;
