import {Header,Button, Item, Label } from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";
import AddProductwishlist from './AddProductwishlist'
function ProductSummary({ name, exampleUrl, _id, price, school_of,description }) {
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
          <Item.Extra>
            <AddProductToCart productId={_id} />
            <AddProductwishlist productId={_id} />
          </Item.Extra>
          <Header text style={{ paddingTop: "2em" }}as="h3">About this product</Header>
          
      <p>{description}</p>
         <Button
       // icon="trash alternate outline"
       // color="red"
       // content="Delete Product"
      /> 
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;

