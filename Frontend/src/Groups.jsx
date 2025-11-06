import { Motion } from "./Motion";
import { Link } from "react-router-dom";

const Groups = ({ resData }) =>{
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    if (!currentUser) {
        console.warn("No currentUser found in localStorage.");
        return null;
      }
    return (
        <Motion>
            <Link
                to={`/GroupDetail/${resData.title}`}
                state={{ group: resData, user:currentUser }}
                className="hover:scale-105 transition-transform duration-300"
                >   
                <div className="flex justify-between items-center bg-linear-to-b from-slate-800 to-violet-800 gap-7 m-7 rounded-3xl p-2 w-[200px] h-[100px] hover:bg-linear-to-b hover:from-amber-50 hover:to-amber-50 hover:text-black">
                    <div className=" m-2">
                        <h1 className="font-bold p-2 text-lg capitalize">{resData.title}</h1>
                        <hr className="bg-amber-50 w-[150px]"></hr>
                        <div className="flex gap-4 p-4">
                            <h6 className="text-xl capitalize">{resData.membersList.length}</h6>
                        </div>
                    </div>
                </div>
            </Link>
        </Motion>
    )
}

export default Groups;