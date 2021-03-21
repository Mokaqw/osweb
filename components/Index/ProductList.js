import { Card } from "semantic-ui-react";

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(product => ({
        header: product.name,
        image: product.exampleUrl,
        meta: product.school_of,
        description: products.description,
        extra: `${product.price}    BATH` ,
      color: "red",
      fluid: false,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }));
  }

  return (
    <Card.Group
      stackable
      itemsPerRow="2"
      center
      items={mapProductsToItems(products)}
    />
  );
}

export default ProductList;
