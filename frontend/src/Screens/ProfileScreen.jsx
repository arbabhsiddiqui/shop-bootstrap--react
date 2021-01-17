import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { getUserDetails, updateUserDetails } from "../actions/userAction";
import { ListMyOrders } from "../actions/orderActions";
const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  const listMyOrders = useSelector((state) => state.listMyOrders);
  const { loading: loadingMyOrder, orders, error: errorMyOrder } = listMyOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(ListMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password Do not  match");
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <h4>Update Profile</h4>

          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Update</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter New your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirm password">
              <Form.Label>confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="info">
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingMyOrder ? (
            <Loader />
          ) : errorMyOrder ? (
            <Message variant="danger">{errorMyOrder}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid === 1 ? "Paid" : "Not PAid"}</td>
                    <td>
                      {order.isDelivered === true
                        ? "DELIVERED"
                        : "Not DELIVERED"}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
