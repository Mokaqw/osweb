import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import MainView from '../components/_App/View/MainView';
import MainAttributes from '../components/_App/View/MainAttributes'

function Main({products}) {
  return (<>
     <MainView/>
  <MainAttributes/>
 </> )}
Main.getInitialProps = async () =>{
  const url ='http://localhost:3000/api/products'
  const reponse = await axios.get(url)
  return {products: reponse.data};
}
export default Main;
