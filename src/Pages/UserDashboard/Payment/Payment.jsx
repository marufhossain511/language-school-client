import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
    const loadData=useLoaderData()
    const total=loadData.price
    const price=parseFloat(total.toFixed(2))
    console.log(loadData);
    return (
        <div className="w-full">
            <h2 className="text-4xl font-medium font-mono text-center">Payment</h2>
            <div className="w-1/2 mx-auto my-20">
            <Elements stripe={stripePromise}>
                <CheckOut cart={loadData} price={price} ></CheckOut>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;