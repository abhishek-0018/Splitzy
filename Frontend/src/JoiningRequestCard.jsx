import { useState,useEffect } from "react";
import axios from "axios";

const JoiningRequestCard=({ userData, groupId, onAction })=>{
  const [user,setUser]=useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/getUser`,
          { params: { user:userData } }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching User details:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchUser();
  },[]);

  const handleAction = async(action)=>{
    const access = localStorage.getItem("accessToken");
    const payload = { groupId, requester:userData, action };
    try {
      const response = await axios.post(
      "http://localhost:8000/api/v1/groups/handleJoiningRequest",
        payload,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      onAction(userData);
    } catch (err) {
      console.log(err);}
  }

  if(!user) return;
  return (
    <div className="flex justify-between items-center border-2 transition duration-300 ease-in-out border-amber-50 bg-linear-to-b from-slate-800 to-violet-800 gap-7 rounded-3xl p-2 w-[40%] h-[60px] hover:bg-linear-to-b hover:scale-105">
      {user.gotuser.name}
      <div className="flex justify-between items-center gap-4">
        <button className="bg-green-500 border-2 cursor-pointer transition duration-300 ease-in-out border-green-700 rounded-2xl h-8 w-16 text-center hover:scale-110" onClick={()=>{
          handleAction("Accept");
        }}>Accept</button>
        <button className="bg-red-500 border-2 cursor-pointer transition duration-300 ease-in-out border-red-700 rounded-2xl h-8 w-16 text-center hover:scale-110" onClick={()=>{
          handleAction("Reject");
        }}>Reject</button>
      </div>
    </div>
  )
}

export default JoiningRequestCard;