import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import MembersCard from "./MembersCard";


const MembersList = () => {
  const { group, userStatus } = useOutletContext();
  const [membersList,setMembersList]=useState([]);

  useEffect(()=>{
    if (!group) return;
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/groups/getGroup`,
          { params: { userStatus, groupId: group._id } }
        );
        setMembersList(response.data.data.membersList);
      } catch (error) {
        console.error(
          "Error fetching group details:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchGroup();
  },[]);
  if (!group) {
    return <p className="text-white text-center">No group data found.</p>;
  }
  return (
    <div className="flex flex-col gap-5 p-4 text-white w-full text-center">
      <div className="text-white text-4xl my-4">Members List</div>
      <div className="flex flex-wrap flex-col gap-5">
      {membersList.length > 0 ? (
        membersList.map((req, index) => (
          <MembersCard
            key={req._id || index}
            userData={req}
            groupAdmin={group.groupAdmin}
          />
        ))
      ) : (
        <p className="text-center mt-4">No members to show.</p>
      )}
      </div>
    </div>
  );
};
export default MembersList;
