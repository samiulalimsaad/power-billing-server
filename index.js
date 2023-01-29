import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

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
