import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";


function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  
  const [isCartEmpty, setCartEmpty] = React.useState(false);
 
  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0)
  }, [products]);
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> {cartAmount} BATH
        <StripeCheckout
        
          name="PAYMENT"
          amount={stripeAmount}
         image={products.length > 0 ? products[0].product.exampleUrl : ""}
         shippingAddress={false}
          currency="THB"
         stripeKey="pk_test_51K2FI4Cd1y3zx6nGOoI7oSkriMe3HumANanEt265EOZFW6SHncxjHSKEB1WKiJYzAbhICi2K8BlN9jsM3hduTlDZ00Jx5X8EyW"
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button 
            icon="cart" 
            disabled={isCartEmpty || success} 
            floated="right" 
            content="Checkout"
          />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;