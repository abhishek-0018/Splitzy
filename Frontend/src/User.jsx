import { useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [groupAction, setGroupAction] = useState("");
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

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
    const payload = { title };
    const endpoint = "/api/v1/groups/createGroup";
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
      setGroupAction("");
    } catch (err) {
      console.error("Failed to create group:", err);
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
                className="p-3 w-full bg-transparent outline-none text-amber-50"
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
      <div className="bg-[#5f1cef46] border border-gray-500 text-amber-50 w-full h-[50%]">
        No group joined yet. {user.joinedGroups.length}
      </div>
    </div>
  );
};

export default User;
