import React, {useContext, useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./payment-form.style.scss";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import Button from "../button/button.component";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { cartTotalPrice } = useContext(CartContext)
  const { currentUser } = useContext(UserContext);
  const amount = cartTotalPrice
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true)

    const response = await fetch("/////", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    }).then((res) => res.json);

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(),
        billing_details: {
          name: currentUser ? currentUser.displayName: 'Guest'
        },
      },
    });

    setIsProcessingPayment(false)

    if (paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert('Payment Sucessfully')
      }
    }
  };
  return (
    <div className="payment-form-container">
      <div className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card: </h2>
        <CardElement />
        <Button isLoading={isProcessingPayment} buttonType="inverted">Pay now</Button>
      </div>
    </div>
  );
};

export default PaymentForm;
