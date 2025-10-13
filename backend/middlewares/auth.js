import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userAuth = async (req, res, next) => {
    try{
        const token = req?.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                message: "Please login!",
                success: false,
            });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decodedObj){
            return res.status(401).json({
                message: "Authentication Denied.",
                success: false,
            });
        }

        const {_id} = decodedObj;

        const user = await User.findById(_id).select("-password");

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        req.user = user;
;
        next();
    }
    catch(err){
        res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
        console.log(err);        
    }
}

export default userAuth;