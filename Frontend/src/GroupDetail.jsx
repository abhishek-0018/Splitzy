import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
const GroupDetail=()=>{
    const [groupDetail,setGroupDetail]=useState(null);
    const location = useLocation();
    const group = location.state.group;

    useEffect(()=>{
        
    },[]);

    // if(!groupDetail) return <p>Group details not found. Please navigate from the groups list.</p>;
    return(
        <div className="absolute flex flex-col h-[90%] w-[90%] gap-2 text-amber-50">
            <h1>This is group details {group.title}</h1>
        </div>
    )
}

export default GroupDetail;