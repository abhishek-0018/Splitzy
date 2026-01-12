import axios from "axios"
import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL;
import PaymentLogCard from "./PaymentLogCard";

const PaymentApprovals=()=>{
    const {group,currentUser}=useOutletContext();
    const [paymentLogs,setPaymentLogs]=useState([]);
    const accessToken = localStorage.getItem("accessToken");
    useEffect(()=>{
        if (!currentUser || !group) return;

        const fetchPaymentLogs = async () => {
            try {
              const response = await axios.get(
                `${API_URL}/api/v1/groups/paymentLogs`,
                { params: { user:currentUser._id, group: group._id },
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );
              setPaymentLogs(response.data.data);
            } catch (error) {
              console.error(
                "Error fetching payment logs:",
                error.response?.data?.message || error.message
              );
            }
          };
          fetchPaymentLogs();
    },[])

    if(!paymentLogs.length===0){
        return <p className="text-white text-center">No payment logs found.</p>;
    }

    return(
        <div className="flex flex-col gap-5 p-4 text-white w-full text-center">
            <div className="text-white text-4xl my-4">Payment Lists</div>
            <div className="flex flex-wrap flex-col gap-5">
                {paymentLogs.length>0?(
                    paymentLogs.map((payment,index)=>(
                        <PaymentLogCard
                        key={index}
                        paymentLog={payment}
                        />
                    ))
                ):(<p>No payment log found</p>)}
            </div>
        </div>
    )
}

export default PaymentApprovals;