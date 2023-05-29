import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51NBZS5GHEXLlkUHpHGg91xbjaqVv2tuY7DAYbeo4X8f5sO4jVYL0SghgDRQQLHplLf8RDe5mEIyftHKznQxHEt6j00zvyAPB2z"
);
console.log(stripePromise);