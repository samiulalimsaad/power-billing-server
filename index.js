import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { LoginService } from "./Services/Login.Service.js";
import { RegistrationService } from "./Services/Registration.Service.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
    res.status(200).json({ success: true, message: "OK" });
});

app.post("/api/registration", RegistrationService);

app.post("/api/login", LoginService);

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    mongoose.connect(
        process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            autoIndex: true, //make this also true
        },
        () => {
            console.log("Database is connected");
        }
    );
});
