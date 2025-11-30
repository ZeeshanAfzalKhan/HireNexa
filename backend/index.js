import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import "./utils/googleOAuth.js";
import "./utils/githubOAuth.js";

import connectDB from "./utils/database.js";

import userRoute from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app=express();

app.set("trust proxy", 1);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true 
}

app.use(cors(corsOptions)); 


app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


const PORT = process.env.PORT || 3000;

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