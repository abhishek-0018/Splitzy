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
          required: true 
        },
        membersList: [
          { 
            type: String, 
          }
        ],
        groupAdmin: 
        { 
          type: Schema.Types.ObjectId, 
          ref: "User",
        },
      }, { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);