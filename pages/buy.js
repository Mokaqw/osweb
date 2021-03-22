import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';



function Buy({products}) {
  return <ProductList products ={products}/>;
}
Buy.getInitialProps = async () =>{
  const url ='http://localhost:3000/api/products'
  const reponse = await axios.get(url)
  return {products: reponse.data};
  //fetch data on server 
  //return reponse data aas an object
  // note :this object will be  merged with existing props
}
export default Buy;
