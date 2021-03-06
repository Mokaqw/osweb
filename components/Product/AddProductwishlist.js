import React from "react";
import { Input,Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

function AddProductToWishlist({ user, productId }) {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timeout;
  
    if(success){
      timeout = setTimeout( () => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [success])

  async function handleAddProductToWishlist() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/whistlist`;
      const payload = { quantity, productId };
      const token = cookie.get("token");
      //Sending authorization header with the pay load for extra security
      const headers = { headers: { Authorization: token } };
      //Since we want to update the array products in Cart.js, so we need
      //a PUT request and not a POST request.
      await axios.put(url, payload, headers);
      //To show that the product has been added message we will need a state success
      setSuccess(true);
    } catch (error) {
        catchErrors(error, window.alert);//To show an alert box in browser
    } finally {
      setLoading(false);//Both successful or error case, stop the spinner.
    }

  }

  return (


    <Input
    type="number"
    min="1"
    placeholder="Quantity"
    value={quantity}
    onChange={event => setQuantity(Number(event.target.value))}
   action={//using nested ternary
       user && success
        ? {
            color: "green",
            content: "Item Added!",
            icon: "star",
             disabled: true //We will show this disabled button to show the message Item Added
            }
          : user
          ? {
             color: "green",
              content: "Add to wishlist",
             icon: "star",
              loading,//This means set loading to true if const loading above is true. loading = loading; 
              disabled: loading, //Disable this orange button when loading is true i.e., we are trying to add a product to cart.
              onClick:  handleAddProductToWishlist
            }
         : {
             color: "green",
             content: "Login To wishlist",
             icon: "star",
             onClick: () => router.push("/login")
            }
          }
        />
      );
    }
    
export default AddProductToWishlist;