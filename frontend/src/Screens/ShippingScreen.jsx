import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>city</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>country</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Proceed
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
