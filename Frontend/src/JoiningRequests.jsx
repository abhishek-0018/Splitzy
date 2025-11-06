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
    <div className="bg-amber-50 h-[50px] w-full text-black">
      {user.gotuser.name}
    </div>
  )
}

const JoiningRequests = () => {
  const { group, currentUser, userStatus } = useOutletContext();
  if (!group) {
    return <p className="text-white text-center">No group data found.</p>;
  }
  return (
    <div className="p-4 text-white">
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
