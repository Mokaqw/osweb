import { Card } from "semantic-ui-react";
import ReadMoreReact from 'read-more-react';
function ProductList({ products , }) {
  function mapProductsToItems(products ,) {
    return products.map(product => ({
        header: product.name,
        meta: product.school_of,
        description : 
        <ReadMoreReact text={`${product.description }`}
        min={80}
        ideal={100}
        max={200}
        readMoreText=""
       />
        , 
        extra: `${product.price}    BATH` ,
      color: "green",
      fluid: false,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }));
  }

  return (
   
    <Card.Group  style={{width: '', 
    height: '40%', }}
      stackable
      itemsPerRow="2"
      center
      large
      items={mapProductsToItems(products)}

    />
   
  );
}

export default ProductList;
