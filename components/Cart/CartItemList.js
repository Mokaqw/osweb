import { Header, Segment, Button, Icon } from "semantic-ui-react";

function CartItemList() {
  const user = false;

  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        Add Sheet in Cart
      </Header>
      <div>
        {user ? (
           <Button color="blue">Login to Add Products</Button>
        ) : (
          <Button color="green">View Products</Button>
        )}
      </div>
    </Segment>
  );
}

export default CartItemList;