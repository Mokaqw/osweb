import React from 'react';
import axios from 'axios';
import {Item, Label,Grid,Image} from 'semantic-ui-react'
import ProductList from '../../Index/ProductList';
function MainView({products}){
    return<>
      <Image stype ={{width: '2500',height: '1000'}} 
      src='/static/favicon/Banner_ASEAN_TOP10-01.png'   />
   
    </>
}
MainView.getInitialProps = async () =>{
    const url ='http://localhost:3000/api/products'
    const reponse = await axios.get(url)
    return {products: reponse.data};
    //fetch data on server 
    //return reponse data aas an object
    // note :this object will be  merged with existing props
  }
  export default MainView;