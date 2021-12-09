import React from 'react'
import {Header,Button, Item, Label,Modal } from "semantic-ui-react";
import axios from 'axios';
import {useRouter} from 'next/router';
import AddProductToCart from "./AddProductToCart";
import AddProductwishlist from './AddProductwishlist'
function ProductSummary({ name, exampleUrl, _id, price, school_of,description ,user}) {
  const [modal, setModal] = React.useState(false);
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isUser = user && user.role === "user";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;
  
  async function handleDelete() {
    const url = 'http://localhost:3000/api/product';
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/buy");
 }
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={exampleUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>{price}  bath</p>
            <Label>School of : {school_of}</Label>
          </Item.Description>
          {
        
        isUser && (
          <>
          <Item.Extra>
          <AddProductToCart  user={user} productId={_id} />
            
          </Item.Extra>
          </>)}
          <Header text style={{ paddingTop: "2em" }}as="h3">About this product</Header>
          
      <p>{description}</p>
      <br/>
      {
        isRootOrAdmin && (
          <>
         <Button icon="trash alternate outline"  color="red"    content="Delete Product"
         onClick={()=>setModal(true)}
      /> 
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this  product</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={()=> setModal(false)} content="Cancel"/>
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />

        </Modal.Actions>
      </Modal>
      <Button icon="backward"  color="green"    content="    Back"
        onClick={() => router.push(`/account`)} /> 
      </>
        )
       
      }
      
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;

