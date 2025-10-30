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

const createJoiningRequest =asyncHandler(async(req,res)=>{
    const {joiningCode}=req.body;

    if (!joiningCode) {
        throw new ApiError(400, "Joining code is required");
    }
    
    const groupExist= await Group.findOne({joiningCode});
    if (!groupExist){
        throw new ApiError(409,"No group with such joining code exists");
    }

    let joiningRequest = groupExist.joiningRequest;
    let membersJoined = groupExist.membersList;
    
    if (joiningRequest.some(reqId => reqId.toString() === req.user._id.toString())) {
      throw new ApiError(409, "Already requested to join");
    }
    
    if (membersJoined.some(memberId => memberId.toString() === req.user._id.toString())) {
      throw new ApiError(409, "Already a member in this group");
    }
    joiningRequest.push(req.user._id);

    const response=await Group.findByIdAndUpdate(
        groupExist._id,
        {
            $set:{
                joiningRequest:joiningRequest
            }
        },
        {new:true}
        )

        return res.status(200).json(
            new ApiResponse(200,response,"Joining request send successfully")
        )
})

const getJoinedGroups=asyncHandler(async(req,res)=>{
    const userId = req.user._id;

    const groups = await Group.find({
    $or: [
      { groupAdmin: userId },
      { membersList: { $in: [userId] } }
    ]
  }).select(
    "title membersList"
);

    if (!groups) {
        throw new ApiError(404, "You are not a member of any group yet");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, groups, "Groups fetched successfully"));
})

export {createGroup,createJoiningRequest,getJoinedGroups}