import express from "express";
import { config } from "dotenv";
import Cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";




const app = express();

config({path:"./config/config.env"});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Cors(
    {
        origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
));


app.use(fileUpload({
    tempFileDir:'./uploads',
    useTempFiles:true
}))
app.use(errorMiddleware)
app.use("/api/v1/auth",authRoutes);

export default app;