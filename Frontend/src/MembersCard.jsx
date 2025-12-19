import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const MembersCard = ({ userData, groupAdmin }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
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
  
    if (!user) return;
    return (
      <div className="flex justify-between items-center border-2 transition duration-300 ease-in-out border-amber-50 bg-linear-to-b from-slate-800 to-violet-800 gap-7 rounded-3xl p-2 w-40 h-[60px] hover:bg-linear-to-b hover:scale-105">
        {user.gotuser.name}
        {user.gotuser._id === groupAdmin && <p>Admin</p>}
      </div>
    );
  };

  export default MembersCard;