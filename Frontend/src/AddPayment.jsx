import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import SelectMembersCard from "./SelectMembersCard";
const API_URL = import.meta.env.VITE_API_URL;

const AddPayment = () => {
  const [amount, setAmount] = useState();
  const [splitType, setSplitType] = useState("");
  const [description,setDescription] =useState("");
  const { group,userStatus, currentUser } = useOutletContext();
  const [membersList,setMembersList]=useState([]);
  const [selectedMembers,setSelectedMembers]=useState([]);

  const addMember=(memberId,state)=>{
    setSelectedMembers((prev) =>
    state === "selected"
      ? [...prev, memberId]
      : prev.filter((id) => id !== memberId)
    );
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const access = localStorage.getItem("accessToken");

    const paymentData=new FormData();
    paymentData.append("groupid",group._id);
    paymentData.append("selectedMembers",selectedMembers);
    paymentData.append("amount",amount);
    paymentData.append("payerid",currentUser._id);
    paymentData.append("description",description);

    try {
      const response = await axios.post(
          `${API_URL}/api/v1/groups/addPayment`,
          paymentData,
          {
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
      );
      if (response.data.success) {
          setAmount();
          setDescription("");
          setSelectedMembers([]);
          setSplitType("");
      }
  } catch (error) {
      console.error(
          "Error:",
          error.response?.data?.message || "Something went wrong"
      );
      alert(error.response?.data?.message || "Error during authentication");
  }
  }

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
    <div className="flex flex-col h-full w-full items-center gap-12">
      <p className="text-white text-4xl">Add Payment</p>

      <form className="flex flex-col w-[90%]"  onSubmit={handleSubmit}>
        <div className="flex gap-3">
        <label className="flex gap-8 items-center">
        Amount:
        <input
          className="border-2 border-white h-10 w-100 rounded-2xl p-4"
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        </label>
        <button type="submit" className="bg-[#100E0E] transition duration-300 ease-in-out border-2 border-white rounded-4xl h-[50px] w-[150px] text-white hover:bg-white hover:text-black hover:scale-105">
          Add Payment
        </button>
        </div>

        <label className="flex gap-2 items-center">
        Description:
        <input
          className="border-2 border-white h-10 w-100 rounded-2xl p-4"
          type="text"
          placeholder="Where did you paid?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <p className="text-white mt-4">Split type:</p>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="splitType"
            value="Equal"
            checked={splitType === "Equal"}
            onChange={(e) => setSplitType(e.target.value)}
            className="hidden"
          />

          <span
            className={`h-4 w-4 rounded-full border-2 border-white flex items-center justify-center`}
          >
            {splitType === "Equal" && (
              <span className="h-2 w-2 rounded-full bg-indigo-700"></span>
            )}
          </span>

          <span className="text-white">Equal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="splitType"
            value="Unequal"
            checked={splitType === "Unequal"}
            onChange={(e) => setSplitType(e.target.value)}
            className="hidden"
          />

          <span
            className={`h-4 w-4 rounded-full border-2 border-white flex items-center justify-center`}
          >
            {splitType === "Unequal" && (
              <span className="h-2 w-2 rounded-full bg-indigo-700"></span>
            )}
          </span>

          <span className="text-white">Unequal</span>
        </label>

        {splitType!==""&&(
          <div className="flex flex-wrap flex-col gap-5">
            Select Members
          {membersList.length > 0 ? (
            membersList.map((req,index) => (
              <SelectMembersCard
                key={index}
                userData={req}
                onAction={(state)=>addMember(req,state)}
              />
            ))
          ) : (
            <p className="text-center mt-4">No members to show.</p>
          )}</div>)
        }
      </form>
    </div>
  );
};

export default AddPayment;
