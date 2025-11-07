import User from "../models/user.model.js";
import validator from "validator";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailId, password, role } =
      req.body;
    if (!firstName) {
      return res.status(400).json({
        success: false,
        error: "Please enter your Name.",
      });
    } else if (!validator.isLength(firstName, { min: 3, max: 20 })) {
      return res.status(400).json({
        success: false,
        error: "Name must be between 3 and 20 characters.",
      });
    } else if (lastName && !validator.isLength(lastName, { min: 3, max: 20 })) {
      return res.status(400).json({
        success: false,
        error: "Name must be between 3 and 20 characters.",
      });
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number.",
      });
    } else if (!validator.isEmail(emailId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email.",
      });
    } else if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        error: "Enter a strong password",
      });
    } else if (!["student", "recruitor"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists. Please login",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      emailId,
      password,
      role,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(400).json({
        success: false,
        error: "Something went wrong while registering the user.",
      });
    }

    const options = {
      httpsOnly: true,
      secure: true,
    };

    const token = createdUser.generateAuthToken();

    return res.status(201).cookie("token", token, options).json({
      message: "Account created successfully.",
      success: true,
      user: createdUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { emailId, password, role } = req.body;
    if (!emailId || !password || !role) {
      return res.status(400).json({
        success: false,
        error: "Please fill all the fields.",
      });
    }

    if (!validator.isEmail(emailId)) {
      return res.status(400).json({
        error: "Invalid email.",
        success: false,
      });
    }

    if (!["student", "recruitor"].includes(role)) {
      return res.status(400).json({
        error: "Invalid role.",
        success: false,
      });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({
        error: "User not found. Please signup!",
        success: false,
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid Password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        error: "Account doesn't exists with current role.",
        success: false,
      });
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpsOnly: true,
      secure: true,
    };

    const token = user.generateAuthToken();

    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: `Welcome back ${user.firstName}`,
        user: loggedInUser,
        success: true,
      });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
    console.log(err.message);
  }
};

export const oauthCallback = async (req, res) => {
  try {
    const { user, error } = req.user;

    if(error) {
      return res.status(400).json({
        success: false,
        error: error,
        user: null
      })
    }

    // if(user === null) {
    //   return res.status(400).json({error: "User not found."})
    // }

    const token = user.generateAuthToken();

    const options = {
      httpsOnly: true,
      secure: true,
    };

    res.cookie("token", token, options);

    // Redirect user to frontend (without token in URL)
    return res
      .status(200)
      // .redirect(`${process.env.FRONTEND_URL}/oauth/callback`)
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
    console.log(err);
  }
};
