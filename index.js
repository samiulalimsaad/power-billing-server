import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { verifyUser } from "./middleware/verifyUser.js";
import { BillingService } from "./Services/Billing.Service.js";
import { LoginService } from "./Services/Login.Service.js";
import { RegistrationService } from "./Services/Registration.Service.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
    res.status(200).json({ success: true, message: "OK" });
});

const billingService = new BillingService();

app.post("/api/registration", RegistrationService);

app.post("/api/login", LoginService);

app.get("/api/billing-total", verifyUser, billingService.totalBillAmount);

app.get("/api/billing-list", verifyUser, billingService.billList);

app.post("/api/add-billing", verifyUser, billingService.addBill);

app.patch("/api/update-billing/:id", verifyUser, billingService.updateBill);

app.delete("/api/delete-billing/:id", verifyUser, billingService.deleteBill);

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
