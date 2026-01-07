import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Group} from "../models/group.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { nanoid } from 'nanoid';
import { Payment } from "../models/payment.js";

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
});

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
});

const getJoinedGroups=asyncHandler(async(req,res)=>{
    const userId = req.user._id;

    const groups = await Group.find({
    $or: [
      { groupAdmin: userId },
      { membersList: { $in: [userId] } }
    ]
  }).select(
    "title membersList groupAdmin"
);

    if (!groups) {
        throw new ApiError(404, "You are not a member of any group yet");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, groups, "Groups fetched successfully"));
});

const getGroup = asyncHandler(async (req, res) => {
    const {userStatus,groupId} = req.query;
    if(!groupId){
      throw new ApiError(400, "Group ID is required");
    }
    const group=userStatus==="Admin"?await Group.findById(groupId).select("-updatedAt"):await Group.findById(groupId).select("-updatedAt -joiningRequest");
    if (!group) {
      throw new ApiError(404, "No group found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, group, "Group fetched successfully"));
});

const handleJoiningRequest =asyncHandler(async(req,res)=>{
  const {groupId,requester,action}=req.body;

  if(!groupId||!requester||!action){
    throw new ApiError(400,"Not all field are given");
  }

  const group = await Group.findById(groupId);

  if(!group){
    throw new ApiError(409,"No such group exists");
  }

  let joiningRequest = group.joiningRequest;
  let membersJoined = group.membersList;

  let index = joiningRequest.indexOf(requester);
  if (index > -1) {
      joiningRequest.splice(index, 1);
  }

  if(action==="Accept"){
    membersJoined.push(requester);
  }

  const response=await Group.findByIdAndUpdate(
    group._id,
    {
        $set:{
            joiningRequest:joiningRequest,
            membersList:membersJoined
        }
    },
    {new:true}
    )

    return res.status(200).json(
        new ApiResponse(200,response,"Operation successfully")
    )

});

const addPayment = asyncHandler(async(req,res)=>{
  const {groupid,payerid,selectedMembers,totalAmount,splitType,description}=req.body;

  if(!groupid|| !payerid|| !selectedMembers|| !totalAmount){
    throw new ApiError(400,"Not all fields are given");
  }
  const beneficiaries = Object.entries(selectedMembers).map(
    ([userId, amount]) => ({
      user: userId,
      amount: Number(amount),
    })
  );

  if (beneficiaries.length === 0) {
    throw new ApiError(400,"At least one beneficiary required");
  }
  
  if(splitType==="Unequal"){
    const sum = beneficiaries.reduce((acc, b) => acc + b.amount, 0);
    if (sum !== Number(totalAmount)) {
      throw new ApiError(400, "Split amounts do not match total amount");
    }
  }

  const payment= await Payment.create({
    groupid,
    payerid,
    totalAmount,
    splitType,
    beneficiaries,
    description,
    status:"Pending"
  })

  if(!payment){
    throw new ApiError(500,"Something went wrong while adding payment.")
  }

  return res.status(201).json(
    new ApiResponse(200, payment, "Payment added successfully")
  )
})

const paymentLogs=asyncHandler(async(req,res)=>{
  const {user,group}=req.query;

  if(!user||!group){
    throw new ApiError(400,"Not every field is provided");
  }

  const logs = await Payment.find({
    groupid: group,
    "beneficiaries.user": user
  }).select("-approvals");

return res.status(201).json(
  new ApiResponse(200, logs, "Payment logs fetched successfully")
)

})

export {createGroup,createJoiningRequest,getJoinedGroups,getGroup,handleJoiningRequest,addPayment,paymentLogs}