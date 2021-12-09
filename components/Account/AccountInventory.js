import {
  Header,
  Accordion,
  Label,
  Segment,
  Icon,
  Button,
  List,
  Image
} from "semantic-ui-react";
import { useRouter } from "next/router";


function AccountOrders({ orders }) {
  const router = useRouter();

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      content: {
        content: (
          <>
            <List>
              {order.products.map(p => (
                <List.Item key={p.product._id}>
                  <Image avatar src={p.product.exampleUrl} />
                  <List.Content>
                    <List.Header>{p.product.name}</List.Header>
                    <List.Description>
                       {p.product.price} Bath
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                  <Button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href=`${p.product.exampleUrl}`;
      }}
> Dowmnload</Button>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }));
  }

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
       Inventory
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
           No Sheet !!!.
          </Header>
          <div>
            <Button onClick={() => router.push("/buy")} color="orange">
              See our product
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  );
}

export default AccountOrders;