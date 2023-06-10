import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './Checkout.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CheckOut = ({cart,price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user}=useContext(AuthContext)
    const [clientSecret,setClientSecret]=useState(' ')
    const[processing,setProcessing]=useState(false)
    const [transactionId,setTransactionId]=useState('')
    const[cardError,setCardError]=useState('') 
    const navigate=useNavigate() 
    useEffect(()=>{
        if(price > 0){
            axios.post('http://localhost:5000/create-payment-intent',{price})
            .then(response=>{
                setClientSecret(response.data.clientSecret)
            })
        }
    },[price])

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      
      const {error} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('error', error);
        setCardError(error.message)
      }
      else{
        setCardError('')
      }
         
        setProcessing(true)
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email:user?.email || 'unknown' , 
                  name: user?.name  || 'anonymous',
                },
              },
            },
          );
          if(confirmError){
            console.log(confirmError);
          }
          console.log(paymentIntent);
          setProcessing(false)
          if(paymentIntent.status ==='succeeded'){
            setTransactionId(paymentIntent.id)
            axios.post('http://localhost:5000/enrolledclass',cart)
            .then(res=>{
              console.log(res.data);
            })

            const payment={
                email:user?.email,
                transactionId:paymentIntent.id,
                price, 
                status:'service pending',
                date:new Date(),
                quantity:cart.length,
                classId:cart.map(item=>item.classId),
                cartItems:cart.map(item=>item._id),              
                className:cart.map(item=>item.className)
               }
               axios.post('http://localhost:5000/payments',payment)
               .then(res=>{
                console.log(res.data);
                navigate('/dashboard/enrolledclasses')
               })

          }

    };
  
    return (
        <div>
             <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="text-center">
     
      {
        processing?<FaSpinner className='animate-spin h-24'/> :
        <button className=" my-4 btn px-6 bg-accent-focus font-bold text-white" type="submit" disabled={!stripe || processing || !clientSecret}>
        PAY
      </button>
      }
       
     
      </div>
    </form>
         {cardError && <p className='text-red-600'>{cardError}</p>}
         {transactionId && <p className='text-green-500'>Transaction complete with TransactionId: {transactionId}</p>}
        </div>
    );
};

export default CheckOut;