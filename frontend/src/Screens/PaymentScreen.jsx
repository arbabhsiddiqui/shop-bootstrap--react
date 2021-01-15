import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";

import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label as="legend">Select Method</Form.Label>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card "
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Proceed
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
