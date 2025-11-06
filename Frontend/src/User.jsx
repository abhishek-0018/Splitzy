import { useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Groups from "./Groups";

const User = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [joiningCode,setJoiningCode]=useState("");
  const [groups,setGroups]=useState([]);
  const [groupAction, setGroupAction] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {}, // no body needed
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "Error while logging out:",
        error.response?.data?.message || error.message
      );
    }
    localStorage.removeItem("userData");
    localStorage.removeItem("currentGroup");
    localStorage.removeItem("accessToken");

    navigate("/");
  }

  useEffect(() => {
    if (!user) return;
    const fetchGroups = async () => {
        try {
            const endPoint="/getJoinedGroups"
            const response = await axios.get(`http://localhost:8000/api/v1/groups${endPoint}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            localStorage.setItem("joinedGroups",response);
            setGroups(response.data.data);

        } catch (error) {
            console.error("Error fetching joined groups:", error.response?.data?.message || error.message);
        }
    };

    fetchGroups();
}, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      navigate("/");
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("userData");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const access = localStorage.getItem("accessToken");
    const payload = groupAction==="Create Group"?{ title }:{joiningCode};
    const endpoint = groupAction==="Create Group"?"/api/v1/groups/createGroup":"/api/v1/groups/createJoiningRequest";
    try {
      const response = await axios.post(
        `http://localhost:8000${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message || "Success!");
      setGroupAction("");
    } catch (err) {
      console.log(err);

      if (err.response) {
        const status = err.statusCode;
        const message = err.response?.data?.message || "Something went wrong";
  
        if (status === 409) {
          toast.warn(message);
        } else if (status === 400) {
          toast.error(message);
        } else {
          toast.error(message);
        }
      } else {
        toast.error("Server unreachable. Please try again later.");
      }
  
      console.error(`Failed to ${groupAction}:`, err);
    }
  };
  if (!user) {
    return (
      <p className="absolute text-center mt-20">Redirecting to login...</p>
    );
  }

  return (
    <div className="absolute flex flex-col h-[90%] w-[90%] gap-2">
      <div className="w-full h-[50%] flex gap-2">
        {/* Profile Section */}
        <div className="bg-[#5a06f638] border-gray-500 border rounded-tl-2xl shadow-xl flex flex-col items-center h-full w-[50%] gap-2">
          <div className="flex justify-center mt-5">
            <img
              className="h-[200px] w-[200px] rounded-full"
              src={
                user.avatar ||
                "https://static.vecteezy.com/system/resources/thumbnails/016/058/540/small_2x/icon-person-design-and-line-art-icon-free-vector.jpg"
              }
              alt="User"
            />
          </div>
          <button
            className="bg-[#100E0E] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black"
            onClick={Logout}
          >
            Logout
          </button>
          <div className="flex justify-center">
            <h1 className="text-amber-50 text-xl capitalize">{user.name}</h1>
          </div>
        </div>
        {/* Group forming and joinig section*/}
        <div className="bg-[#5a06f638] border-gray-500 border p-10 rounded-tr-2xl shadow-xl flex h-full w-[50%] justify-center items-center gap-3">
          {groupAction === "" && (
            <button
              className="bg-[#100E0E] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black"
              onClick={() => {
                setGroupAction("Join Group");
              }}
            >
              Join Group
            </button>
          )}
          {groupAction === "Join Group" && (
            <form
              className="flex flex-col items-center gap-10 text-amber-50"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Enter Code here"
                type="text"
                value={joiningCode}
                onChange={(e) => setJoiningCode(e.target.value)}
                className="p-3 w-full border border-gray-500 rounded-4xl bg-transparent outline-none text-amber-50"
                autoComplete="off"
              ></input>

              <button
                type="submit"
                className="bg-[#5a06f638] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black"
              >
                Join Group
              </button>
            </form>
          )}

          {groupAction === "" && (
            <button
              className="bg-[#100E0E] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black"
              onClick={() => {
                setGroupAction("Create Group");
              }}
            >
              Create Group
            </button>
          )}
          {groupAction === "Create Group" && (
            <form
              className="flex flex-col items-center gap-10 text-amber-50"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Enter Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 w-full border border-gray-500 rounded-4xl bg-transparent outline-none text-amber-50"
                autoComplete="off"
              ></input>

              <button
                type="submit"
                className="bg-[#5a06f638] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black"
              >
                Create Group
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Group Details*/}
      <div className="bg-[#5f1cef46] border border-gray-500 text-amber-50 w-full h-auto">
      <div className="flex flex-wrap ml-[100px]">
                            {groups.length > 0 ? (
                                groups.map((group) => (
                                <Groups key={group._id} resData={group} />
                            ))) : (
                            <p className="text-center">No Groups to show.</p>
                    )}</div>
      </div>
    </div>
  );
};

export default User;
