import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens= async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave: false})
        return {accessToken,refreshToken};

    } catch(error){
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    if(name===""){
        throw new ApiError(400,"Name is required")
    }
    if(password===""){
        throw new ApiError(400,"Password is required")
    }
    if(email===""){
        throw new ApiError(400,"Email is required")
    }

    const existedUser= await User.findOne({
        $or: [{email}]
    })
    if (existedUser){
        throw new ApiError(409,"User with email already exist");
    }

    const user= await User.create({
        name,
        email,
        password
    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    
})

const loginUser =asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email){
        throw new ApiError(400,"email is required");
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404,"User does not exist");
    }

    const isPValid = await user.isPasswordCorrect(password);
    
    if(!isPValid){
        throw new ApiError(401,"Password incorrect");
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

    //  for cookies
    const options ={
        httponly:true,
        secure:true  // cookie can only be modified by server
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,{
            user:loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully")
    )

})

export {registerUser,loginUser}