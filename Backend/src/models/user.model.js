import mongoose,{ Schema } from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
  name: 
  { 
    type: String, 
    required: true 
  },
  email: 
  {
    type: String, 
    required: true,
    unique: true 
  },
  password: 
  { 
    type: String, 
    required: true 
  },
  avatar: 
  { 
    type: String
  },
  joinedGroups: 
  { 
    type: [Schema.Types.ObjectId],
    ref: "Group" 
  },
  refreshToken: 
  { 
    type: String
  },
}, { timestamps: true });

userSchema.pre("save",/*callback*/ async function(next){
  if(!this.isModified("password")) return next();// if this line is not used, then whenever a user does some changes in profile, not necessary in password field, password will encrypy again and again.

  this.password= await bcrypt.hash(this.password,10)
  next()
} )

userSchema.methods.isPasswordCorrect= async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
      _id:this._id,
      email:this.email,
      name:this.name,
  },
  process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
      _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
}

export const User= mongoose.model("User", userSchema);