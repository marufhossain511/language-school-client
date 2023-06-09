import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { loadStripe } from '@stripe/stripe-js';
import useCart from "../../../hooks/useCart";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
    const [cart]=useCart()
    const total=cart.reduce((sum,items)=>sum + items.price, 0)
    const price=parseFloat(total.toFixed(2))
    return (
        <div className="w-full">
            <h2 className="text-4xl font-medium font-mono text-center">Payment</h2>
            <div className="w-1/2 mx-auto my-20">
            <Elements stripe={stripePromise}>
                <CheckOut cart={cart} price={price} ></CheckOut>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;