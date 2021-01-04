import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
// import products from "../products";
import axios from "axios";

import { Link } from "react-router-dom";
const ProductScreen = ({ match }) => {
  // const product = products.find((product) => product._id === match.params.id);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };
    fetchProduct();
  });

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>{product.name}</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price : {product.price}</ListGroupItem>
            <ListGroupItem>Description : {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>Price : {product.price}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Status :{" "}
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn btn-block btn-dark"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
