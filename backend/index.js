import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/database.js";

import userRoute from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); //this is a middleware that allows the server to read data sent through forms and attach it to the req.body object in the route handlers.
app.use(cookieParser());

const corsOptions = {
    origin: "*", // Only allow requests from this origin.
    credentials: true // Allow sending cookies and authentication headers in cross-origin requests.
}

app.use(cors(corsOptions)); // this allows the frontend to communicate with the backend.

const PORT=process.env.PORT || 3000;

app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/company", companyRoute);
app.use("/job", jobRoute);
app.use("/application", applicationRoute);


connectDB()
.then(()=>{
    console.log("Database Connected");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Error connecting Database" + err);
})