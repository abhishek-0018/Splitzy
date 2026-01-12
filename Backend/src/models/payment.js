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
        payerName: 
        { 
          type: String, 
          required: true,
        },
        splitType: 
        {
          type: String,
          enum: ["Equal", "Unequal"],
          required: true,
        },
        beneficiaries: 
        [
          {
            _id:false,
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            amount: {
              type: Number,
              required: true,
            },
          },
        ],
        totalAmount: 
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
            enum: ["Approved","Pending","Rejected"],
            default: "Pending"
        }
      }, { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);