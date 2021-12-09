import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import {Header  ,Divider  } from 'semantic-ui-react'
import ProductPagination from "../components/Index/ProductPagination";

function Buy({products, totalPages}) {
  return <> 
  <Header as="h2" >
    Explore sheet
  </Header>
  <Divider />
  <ProductList products ={products}/>
  <ProductPagination totalPages={totalPages} />
  </>;
}
Buy.getInitialProps =  async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 4;
  const url ='http://localhost:3000/api/products'
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Buy;
