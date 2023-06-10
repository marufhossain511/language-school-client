import moment from "moment";
import EmptyCover from "../../components/EmptyCover/EmptyCover";
import usePayment from "../../hooks/usePayment";

const PaymentHistory = () => {
    const[payment]=usePayment()
    console.log(payment);
    return (
        <div className="w-full">
             
             {
                payment.length === 0 ? 
                <EmptyCover title={"You Don't Have Any Payment History"}></EmptyCover>
                :
                <>
                  <h2 className="text-4xl my-6 font-medium font-mono text-center">Payment History</h2>
        <div className="overflow-x-auto mx-4">
        <table className="table">
            {/* head */}
            <thead className="text-sm text-black font-mono font-bold bg-base-200">
            <tr>
                <th>
                 #
                </th>
                <th>Class Image</th>
                <th>Class Name</th>
                <th>Amount</th>
                <th>TransactionId</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
            {
                payment.map((payments,idx)=>  <tr
                key={payments._id}
                >
                    <td>
                    {idx + 1}
                    </td>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={payments.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                    </div>
                    </td>
                    <td>
                    {payments.className}
                    </td>
                    <td>
                    <div className="badge badge-accent">${payments.price}</div>
                    </td>
                    <td className="text-accent-focus">
                        {payments.transactionId}
                    </td>
                    <td>
                    {moment(payments.date).format("LLL")}
                    </td>
                </tr>)
            }
            </tbody>
        </table>
        </div>
                </>
             }

        </div>
    );
};

export default PaymentHistory;