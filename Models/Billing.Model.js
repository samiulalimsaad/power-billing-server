import mongoose from "mongoose";
const { model, Schema } = mongoose;

const BillingSchema = new Schema(
    {
        fullName: { type: String, required: [true, "{PATH} is required"] },
        email: { type: String, required: [true, "{PATH} is required"] },
        phone: { type: String, required: [true, "{PATH} is required"] },
        paidAmount: { type: Number, required: [true, "{PATH} is required"] },
    },
    { timestamps: true }
);

export const BillModel = model("Bill", BillingSchema);
