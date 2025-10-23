import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Group} from "../models/group.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { nanoid } from 'nanoid';

const createGroup=asyncHandler(async(req,res)=>{
    const {title}=req.body;

    if(!title) throw new ApiError(400,"Title is not entered");

    let id = nanoid();
    let membersList=[req.user._id];
    const group= await Group.create({
        title,
        groupAdmin:req.user._id,
        membersList,
        joiningCode: id
    })

    const createdGroup= await Group.findById(group._id)

    if(!createdGroup){
        throw new ApiError(500,"Something went wrong creating group.")
    }

    return res.status(201).json(
        new ApiResponse(200, createdGroup, "Group is created Successfully")
    )

})

export {createGroup}