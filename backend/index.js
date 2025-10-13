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
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: "*", 
    credentials: true 
}

app.use(cors(corsOptions)); 


app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

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