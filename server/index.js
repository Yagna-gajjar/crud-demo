import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
dotenv.config();

const mongourl = process.env.MONGOURL

mongoose.connect(mongourl).then(() => {

    console.log("DB connected");

    app.listen(5000, () => {
        console.log(`server is running on port: 5000`);
    })

}).catch(error => console.log(error));
app.use("/api", route); 