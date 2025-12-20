import mongoose,{ Schema } from "mongoose";

const paymentSchema=new Schema(
    {
        groupid: 
        { 
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Group" 
        },
        payerid: 
        { 
          type: Schema.Types.ObjectId, 
          required: true,
          ref: "User"
        },
        beneficiaries: 
        [
          { 
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: true
          }
        ],
        amount: 
        { 
          type: Number, 
          required: true
        },
        description:
        {
            type: String
        },
        approvals:
        [
            { 
              type: Schema.Types.ObjectId, 
              ref: "User"
            }
        ],
        status:
        {
            type: String,
            enum: ["Approved","Not approved"]
        }
      }, { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);