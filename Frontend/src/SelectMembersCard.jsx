import { useState, useEffect } from "react";
import axios from "axios"; 
const API_URL = import.meta.env.VITE_API_URL;


const SelectMembersCard = ({userData,split,onAction,onAmountChange,amount}) => {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => { 
    const fetchUser = async () => 
    {
      try { 
        const response = await axios.get( `${API_URL}/api/v1/users/getUser`, 
        { 
          params: { user: userData } 
        }); 
        setUser(response.data.data); 
      } catch (error) 
      {
         console.error( "Error fetching User details:", error.response?.data?.message || error.message );
      } };
      fetchUser(); 
    }, []);

  const changeStatus = () => {
    const next = !selected;
    setSelected(next);
    onAction(next ? "selected" : "notSelected");
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={changeStatus}
        className={`flex justify-center items-center border-2 rounded-3xl p-1 w-40 h-10 transition ${
          selected ? "bg-green-700 border-green-400" : "bg-slate-800 border-amber-50"
        }`}
      >
        {user.gotuser.name}
      </button>

      {split === "Unequal" && selected && (
        <input
          type="number"
          placeholder="Amount"
          value={amount ?? ""}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-24 p-1 rounded border border-white bg-black text-white"
        />
      )}
    </div>
  );
};

export default SelectMembersCard;