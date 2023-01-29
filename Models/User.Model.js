import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema(
    {
        fullName: { type: String, required: [true, "{PATH} is required"] },
        email: {
            type: String,
            required: [true, "{PATH} is required"],
            unique: true,
        },
        phone: { type: String, required: [true, "{PATH} is required"] },
        password: { type: String, required: [true, "{PATH} is required"] },
    },
    { timestamps: true }
);

export const UserModel = model("User", userSchema);
