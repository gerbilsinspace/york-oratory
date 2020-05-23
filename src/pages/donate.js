import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/checkoutForm.js"

const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG")

const Donate = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)

export default Donate
