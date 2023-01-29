import mongoose from "mongoose";
const { model, Schema } = mongoose;

const BillingSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        paidAmount: { type: String, required: true },
    },
    { timestamps: true }
);

export const BillModel = model("Bill", BillingSchema);
