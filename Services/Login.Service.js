import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/User.Model.js";
import { loginValidationSchema } from "../utils/validationSchema.js";

export const LoginService = async (req, res) => {
    try {
        const data = loginValidationSchema.validateSync(req.body, {
            abortEarly: true,
        });

        const user = await UserModel.findOne({ email: data.email });

        if (bcrypt.compareSync(data.password, user.password)) {
            const token = jwt.sign(req.body, process.env.ACCESS_TOKEN, {
                expiresIn: "1d",
            });
            res.json({
                token,
                success: true,
            });
        } else {
            throw new Error("invalid Credential");
        }
    } catch (error) {
        res.json({
            success: false,
            error: error.errors?.length ? error.errors : error.message,
        });
    }
};
