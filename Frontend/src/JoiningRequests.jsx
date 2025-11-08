import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import JoiningRequestCard from "./JoiningRequestCard";
import axios from "axios";

const JoiningRequests = () => {
  const { group, userStatus } = useOutletContext();
  const [requests, setRequests] = useState([]);

  useEffect(()=>{
    if (!group) return;
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/groups/getGroup`,
          { params: { userStatus, groupId: group._id } }
        );
        setRequests(response.data.data.joiningRequest);
      } catch (error) {
        console.error(
          "Error fetching group details:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchGroup();
  },[]);

  const handleRequestAction = (userId) => {
    setRequests((prev) => prev.filter((r) => r !== userId));
  };

  if (!group) {
    return <p className="text-white text-center">No group data found.</p>;
  }
  return (
    <div className="flex flex-col gap-5 p-4 text-white w-full">
      <div className="text-white text-4xl my-4">Joining Requests</div>
      
      <div className="flex flex-wrap ml-[100px]">
      {requests.length > 0 ? (
        requests.map((req, index) => (
          <JoiningRequestCard key={req._id || index} userData={req} groupId={group._id} onAction={handleRequestAction}/>
        ))
      ) : (
        <p className="text-center mt-4">No joining requests to show.</p>
      )}
      </div>
    </div>
  );
};

export default JoiningRequests;
