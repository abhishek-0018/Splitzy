import { useOutletContext } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const JoiningRequestCard=({userData})=>{
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
  if(!user) return;
  return (
    <div className="flex justify-between items-center border-2 transition duration-300 ease-in-out border-amber-50 bg-linear-to-b from-slate-800 to-violet-800 gap-7 rounded-3xl p-2 w-[40%] h-[60px] hover:bg-linear-to-b hover:scale-105">
      {user.gotuser.name}
      <div className="flex justify-between items-center gap-4">
        <button className="bg-green-500 border-2 cursor-pointer transition duration-300 ease-in-out border-green-700 rounded-2xl h-8 w-16 text-center hover:scale-110">Accept</button>
        <button className="bg-red-500 border-2 cursor-pointer transition duration-300 ease-in-out border-red-700 rounded-2xl h-8 w-16 text-center hover:scale-110">Reject</button>
      </div>
    </div>
  )
}

const JoiningRequests = () => {
  const { group, currentUser, userStatus } = useOutletContext();
  if (!group) {
    return <p className="text-white text-center">No group data found.</p>;
  }
  return (
    <div className="flex flex-col gap-5 p-4 text-white w-full">
      <h2>Joining Requests for {group.title}</h2>
      <p>User: {currentUser.name}</p>
      <p>Status: {userStatus}</p>

      {group.joiningRequest && group.joiningRequest.length > 0 ? (
        group.joiningRequest.map((req, index) => (
          <JoiningRequestCard key={req._id || index} userData={req} />
        ))
      ) : (
        <p className="text-center mt-4">No joining requests to show.</p>
      )}
    </div>
  );
};

export default JoiningRequests;
