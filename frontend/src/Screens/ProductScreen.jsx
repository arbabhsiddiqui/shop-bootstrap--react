import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  // const product = products.find((product) => product._id === match.params.id);

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const productDetails = useSelector((state) => state.productDetails);

  const { product, loading, error } = productDetails;
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    className="btn btn-block btn-dark"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
