import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginAndRegister=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [action,setAction]=useState("Login");
    const navigate = useNavigate();

    const changeAction=()=>{
        if(action==="Login") setAction("Register")
        else setAction("Login");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(action==="Register"&&!name){
            alert("No data collected");
            return;
        }
        if (!email || !password) {
            alert("No data collected");
            return;
        }

        const userData = new FormData();
        userData.append("email", email);
        userData.append("password", password);
        if(action==="Register"){
            userData.append("name", name);
        }

        const headers = { "Content-Type": "application/json" };
        try {
            const endpoint = action==="Login"?"/api/v1/users/login":"/api/v1/users/register";
            const response = await axios.post(
                `http://localhost:8000${endpoint}`,
                userData,
                { headers }
            );
            if (response.data.success) {
                localStorage.setItem("userData",JSON.stringify(response.data.data.user));
                localStorage.setItem("accessToken", response.data.data.accessToken);
                navigate("/User");
            }
        } catch (error) {
            console.error(
                "Error:",
                error.response?.data?.message || "Something went wrong"
            );
            alert(error.response?.data?.message || "Error during authentication");
        }
    };

    return (
        <div className="absolute w-full max-w-lg bg-[#5a06f638] border-gray-500 border p-10 rounded-2xl shadow-xl">
        <h2 className="text-white text-3xl font-bold text-center mb-10">{action}</h2>
            <form
                className="flex flex-col items-center gap-10 text-amber-50"
                onSubmit={handleSubmit}
            >
                {action==="Register"&&
                    <div className="w-[400px] h-10 bg-[#5a06f638] border-gray-500 border rounded-3xl flex items-center p-5">
                    <input
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 w-full bg-transparent outline-none text-amber-50"
                        autoComplete="off"
                    />
                </div>
                }
                <div className="w-[400px] h-10 bg-[#5a06f638] border-gray-500 border rounded-3xl flex items-center p-5">
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 w-full bg-transparent outline-none text-amber-50"
                        autoComplete="off"
                    />
                </div>

                <div className="w-[400px] h-10 bg-[#5a06f638] border-gray-500 border rounded-3xl flex items-center p-5">
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 w-full bg-transparent outline-none text-amber-50"
                        autoComplete="off"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#5a06f638] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black"
                    onClick={handleSubmit}
                >
                    {action}
                </button>
            </form>
            {action==="Login"&&
            <div className=" text-gray-400 text-[16px] mt-10">
                    Don't have an account?{" "}
                <button className="cursor-pointer text-indigo-700" onClick={changeAction}>Register</button>
            </div>}
            {action==="Register"&&
            <div className=" text-gray-400 text-[16px] mt-10">
                    Already have an account?{" "}
                <button className="cursor-pointer text-indigo-700" onClick={changeAction}>Lofin</button>
            </div>}
        </div>
    )
}

export default LoginAndRegister;