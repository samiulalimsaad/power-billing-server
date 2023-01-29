import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const UserModel = model("User", userSchema);
