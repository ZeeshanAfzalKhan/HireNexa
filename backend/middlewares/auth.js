import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userAuth = async (req, res, next) => {
    try{
        const token = req?.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                error: "Please login!",
                success: false,
            });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decodedObj){
            return res.status(401).json({
                error: "Authentication Denied.",
                success: false,
            });
        }

        const {_id} = decodedObj;

        const user = await User.findById(_id).select("-password");

        if(!user){
            return res.status(404).json({
                error: "User not found",
                success: false,
            });
        }
        req.user = user;
;
        next();
    }
    catch(err){
        res.status(500).json({
            error: "Something went wrong",
            success: false,
        });
        console.log(err);        
    }
}

export default userAuth;