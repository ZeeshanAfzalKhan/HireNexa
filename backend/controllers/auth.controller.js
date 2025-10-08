import {User} from "../models/user.model.js";
import validator from "validator";

export const signup = async (req, res) => {
    try {
        const {firstName, lastName, phoneNumber, emailId, password, role} = req.body;
        if(!firstName){
            return res.status(400).json({
                message: "Please enter your Name.",
                success: false,
            });
        }
        else if(!validator.isMobilePhone(phoneNumber, 'en-IN')){
            return res.status(400).json({
                message: "Invalid phone number.",
                success: false,
            })
        }
        else if(!validator.isEmail(emailId)){
            return res.status(400).json({
                message: "Invalid email.",
                success: false,
            })
        }
        else if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                message: "Enter a strong password",
                success: false,
            })
        }
        else if(!['student', 'recruitor'].includes(role)){
            return res.status(400).json({
                message: "Invalid role",
                success: false,
            })
        }

        const existingUser = await User.findOne({emailId});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists. Please login",
                success: false,
            });
        };

        const user = await User.create({
            firstName,
            lastName,
            phoneNumber,
            emailId,
            password,
            role,
        });

        const createdUser = await User.findById(user._id).select("-password");

        if(!createdUser){
            return res.status(400).json({
                message: "Something went wrong while registering the user.",
                success: false,
            });
        }

        const options = {
            httpsOnly: true,
            secure: true
        }

        const token = createdUser.generateAuthToken();

        return res
        .status(201)
        .cookie("token", token, options)
        .json({
            message: "Account created successfully.",
            success: true,
            user: createdUser
        });
    }
    catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
        console.log(err);
    }
};

export const login = async(req, res) => {
    try{
        const {emailId, password, role} = req.body;
        if(!emailId || !password || !role){
            return res.status(400).json({
                message: "Please fill all the fields.",
                success: false,
            });
        };
        if(!validator.isEmail(emailId)){
            return res.status(400).json({
                message: "Invalid email.",
                success: false,
            })
        }

        if(!["student", "recruitor"].includes(role)){
            return res.status(400).json({
                message: "Invalid role.",
                success: false,
            })
        }

        const user = await User.findOne({emailId});
        if(!user){
            return res.status(400).json({
                message: "User not found. Please signup!",
                success: false,
            });
        };
        

        const isPasswordValid = user.isPasswordCorrect(password);
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid Password.",
                success: false,
            });
        };


        if(role !== user.role){
            return res.status(400).json({
                message: "Account doesn't exists with current role.",
                success: false,
            });
        };

        const options = {
            httpsOnly: true,
            secure: true
        }

        const token = user.generateAuthToken();

        return res.status(200)
                .cookie("token", token, options)
                .json({
                    message: `Welcome back ${user.firstName}`,
                    user,
                    success: true,
                });
    }

    catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
        console.log(err);
    };
};

export const logout = async (req, res) => {
    try{
        return res.status(200).clearCookie("token").json({
            message: "Logged out successfully.",
            success: true,
        });
    }
    catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
        console.log(err);
    }
}
