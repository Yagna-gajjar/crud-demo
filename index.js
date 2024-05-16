import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import path from "path";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
dotenv.config();

const mongourl = process.env.MONGOURL
const port = process.env.PORT || 5000;

mongoose.connect(mongourl).then(() => {

    console.log("DB connected");

    app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
    })

}).catch(error => console.log(error));

const _dirname = path.resolve();
app.use("/api", route);
app.use((express.static(path.join(_dirname, '/client/build'))))

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'client', 'build', 'index.html'))
})