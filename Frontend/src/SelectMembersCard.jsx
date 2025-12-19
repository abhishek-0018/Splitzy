import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const SelectMembersCard = ({ userData, onAction }) => {
    const [user, setUser] = useState(null);
    const [selectedState,setSelectedState]=useState("notSelected");
  
    useEffect(() => {
      const fetchUser = async () => {
        console.log(userData)
        try {
          const response = await axios.get(
            `${API_URL}/api/v1/users/getUser`,
            { params: { user: userData } }
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
    }, []);

    const changeStatus=()=>{
      const nextState = selectedState === "selected" ? "notSelected" : "selected";
      setSelectedState(nextState);
      onAction(nextState);
    }
  
    if (!user) return;
    return (
      <button type="button" className={`flex justify-center items-center border-2 rounded-3xl p-1 w-40 h-10 transition
      ${
        selectedState==="selected"
          ? "border-green-400 bg-green-700"
          : "border-amber-50 bg-slate-800"
      }
    `} onClick={changeStatus}>
        {user.gotuser.name}
      </button>
    );
  };

  export default SelectMembersCard;