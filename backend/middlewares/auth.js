import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userAuth = async (req, res, next) => {
    try{
        const token = req?.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success: false,
                error: {
                    code: "MISSING_TOKEN",
                    message: "Please login!",
                },
            });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decodedObj){
            return res.status(401).json({
                success: false,
                error: {
                    code: "AUTHENTICATION_DENIED",
                    message: "Authentication Denied.",
                },
            });
        }

        const {_id} = decodedObj;

        const user = await User.findById(_id).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                error: {
                    code: "USER_NOT_FOUND",
                    message: "User not found",
                },
            });
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            },
        });
        console.log(err);        
    }
}

export default userAuth;