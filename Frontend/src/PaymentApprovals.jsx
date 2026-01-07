import axios from "axios"
import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL;
const PaymentApprovals=()=>{
    const {group,currentUser,userStatus}=useOutletContext();
    const [paymentLogs,setPaymentLogs]=useState(null);
    const accessToken = localStorage.getItem("accessToken");
    useEffect(()=>{
        if(!currentUser||!group){
            return <p className="text-white text-center">No payment logs found.</p>;
        }

        const fetchPaymentLogs = async () => {
            try {
              const response = await axios.get(
                `${API_URL}/api/v1/groups/paymentLogs`,
                { params: { user:currentUser._id, group: group._id } },
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );
              setPaymentLogs(response.data.data);
              console.log(response.data.data);
            } catch (error) {
              console.error(
                "Error fetching payment logs:",
                error.response?.data?.message || error.message
              );
            }
          };
      
          fetchPaymentLogs();

    },[])
    if(!group){
        return <p className="text-white text-center">No payment logs found.</p>;
    }
    return(
        <div>
            <p>This is payment approvals</p>
        </div>
    )
}

export default PaymentApprovals