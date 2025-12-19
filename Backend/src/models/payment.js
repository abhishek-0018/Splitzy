import mongoose,{ Schema } from "mongoose";

const groupSchema=new Schema(
    {
        title: 
        { 
          type: String, 
          required: true 
        },
        joiningCode: 
        { 
          type: String, 
          required: true,
          unique: true 
        },
        membersList: [
          { 
            type: Schema.Types.ObjectId, 
            ref: "User" 
          }
        ],
        groupAdmin: 
        { 
          type: Schema.Types.ObjectId, 
          ref: "User",
          required: true
        },
        joiningRequest: [
          { 
            type: Schema.Types.ObjectId, 
            ref: "User" 
          }
        ],
      }, { timestamps: true }
);