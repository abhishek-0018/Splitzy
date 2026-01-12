import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const PaymentLogCard=({paymentLog})=>{
    const handleAction = async(action)=>{
        const access = localStorage.getItem("accessToken");
        const payload = { paymentLog, action};
        try {
          const response = await axios.post(
          `${API_URL}/api/v1/groups/paymentApproval`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${access}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (err) {
        console.log(err);}
    }
    return(
        <div className="w-80 transition duration-300 ease-in-out hover:bg-linear-to-b hover:scale-105">
            <div className="flex flex-col justify-between items-start border-2 border-amber-50 bg-linear-to-b from-slate-800 to-violet-800 gap-1 rounded-t-3xl p-2 w-80 h-auto">
                <div>By: {paymentLog.payerName}</div>
                <div>Amount: {paymentLog.totalAmount}</div>
                <div>For: {paymentLog.description}</div>
            </div>
            <div className="flex items-center">
                <button className="bg-black border-2 cursor-pointer transition duration-300 ease-in-out border-green-700 rounded-bl-2xl h-8 w-[50%] text-center hover:scale-102 hover:bg-green-500" onClick={()=>{handleAction("Approved")}}>Accept</button>
                <button className="bg-black border-2 cursor-pointer transition duration-300 ease-in-out border-red-700 rounded-br-2xl h-8 w-[50%] text-center hover:scale-102 hover:bg-red-500" onClick={()=>{handleAction("Rejected")}}>Reject</button>
            </div>
        </div>
    )
}
export default PaymentLogCard;