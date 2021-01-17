import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { payOrder, getOrderById } from "../actions/orderActions";

import { ORDER_PAYMENT_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    // cal. price
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch(getOrderById(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, successPay, orderId, dispatch]);

  const successPaymentHandle = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Row>
      <h1>Order {order._id}</h1>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <strong>Name:</strong> {order.user.name} <br />
            <strong>Email:</strong> {order.user.email}
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address},{order.shippingAddress.city}
              {""}
              {order.shippingAddress.postalCode},{""}
              {order.shippingAddress.country}
            </p>
            {order.isDelivery ? (
              <Message variant="success">
                Delivered on {order.deliveryAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>payment method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not paid</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message variant="info">Your order Is Empty</Message>
            ) : (
              <ListGroup>
                {order.orderItems.map((item, index) => (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty}X Rs.{item.price} = Rs.
                        {item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>Rs.{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>Rs.{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax Price</Col>
                <Col>Rs.{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>Rs.{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandle}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;
