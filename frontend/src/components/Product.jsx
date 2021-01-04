import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="p-3 my-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            // color="yellow"
          />
        </Card.Text>

        <Card.Text as="div">
          <h3 className="my-3">Rs.{product.price}</h3>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
