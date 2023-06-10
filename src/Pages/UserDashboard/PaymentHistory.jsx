import usePayment from "../../hooks/usePayment";
import PaymentHistoryCard from "./PaymentHistoryCard";

const PaymentHistory = () => {
    const[payment]=usePayment()
    console.log(payment);
    return (
        <div className="w-full">
             <h2 className="text-4xl my-6 font-medium font-mono text-center">Payment History</h2>
          

        </div>
    );
};

export default PaymentHistory;