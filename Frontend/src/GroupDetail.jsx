import { useState, useEffect } from "react";
import axios from "axios";
import groupImage from "./assets/Group1.png";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

const GroupDetail = () => {
  const [groupDetail, setGroupDetail] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const group = location.state?.group || JSON.parse(localStorage.getItem("currentGroup") || "null");
  const currentUser = location.state?.user || JSON.parse(localStorage.getItem("userData") || "null");

  useEffect(() => {
    if (group && currentUser) {
      localStorage.setItem("currentGroup", JSON.stringify(group));
      localStorage.setItem("userData", JSON.stringify(currentUser));
    }
  }, [group, currentUser]);

  const userStatus =
    currentUser && group
      ? String(currentUser._id) === String(group.groupAdmin)
        ? "Admin"
        : "Member"
      : "";

  useEffect(() => {
    if (!group || !currentUser) return;
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/groups/getGroup`,
          { params: { userStatus, groupId: group._id } }
        );
        setGroupDetail(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching group details:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchGroup();
  },[]);

  if (!groupDetail)
    return <p className="absolute text-center mt-20">Loading....</p>;

  return (
    <div className="absolute flex  h-[90%] w-[90%] gap-2 text-amber-50">
      <div className="bg-[#5a06f638] border-white border rounded-tl-2xl rounded-bl-2xl shadow-xl flex flex-col items-center h-full w-[50%] gap-2">
        <div className="p-3 flex flex-col items-center gap-5 w-full">
          <img
            src={groupImage}
            alt="Image"
            className="h-[200px] w-[200px] rounded-4xl"
          />
          <p>Name: {groupDetail.title}</p>
          <p>Joining Code: {groupDetail.joiningCode}</p>
        </div>
        <hr className="bg-white h-0.5 w-full" />

        <div className="flex flex-col gap-3 w-full h-full justify-evenly items-center">
          <button
            onClick={() => navigate("")}
            className="bg-[#5a06f638] border-2 cursor-pointer transition duration-300 ease-in-out border-white h-[50px] w-[90%] text-white hover:bg-white hover:text-black hover:scale-105"
          >
            Enter Payment Details
          </button>

          {userStatus === "Admin" && (
            <button
              onClick={() => navigate("joining-requests")}
              className="bg-[#5a06f638] border-2 cursor-pointer transition duration-300 ease-in-out border-white h-[50px] w-[90%] text-white hover:bg-white hover:text-black hover:scale-105"
            >
              Joining Request
            </button>
          )}

          <button
            onClick={() => navigate("payment-approvals")}
            className="bg-[#5a06f638] border-2 cursor-pointer transition duration-300 ease-in-out border-white h-[50px] w-[90%] text-white hover:bg-white hover:text-black hover:scale-105"
          >
            Payment Approvals
          </button>
        </div>
      </div>

      <div className="bg-[#5a06f638] border-white border rounded-tr-2xl rounded-br-2xl shadow-xl flex flex-col items-center h-full w-full gap-2">
        <Outlet context={{ group: groupDetail, currentUser, userStatus }} />
      </div>
    </div>
  );
};

export default GroupDetail;
