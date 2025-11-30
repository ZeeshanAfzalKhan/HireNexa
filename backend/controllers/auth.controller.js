import User from "../models/user.model.js";
import validator from "validator";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailId, password, role } =
      req.body;
    if (!firstName) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIRST_NAME",
          message: "Please enter your Name.",
        },
      });
    } else if (!validator.isLength(firstName, { min: 3, max: 20 })) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_FIRST_NAME",
          message: "Name must be between 3 and 20 characters.",
        },
      });
    } else if (lastName && !validator.isLength(lastName, { min: 3, max: 20 })) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_LAST_NAME",
          message: "Name must be between 3 and 20 characters.",
        },
      });
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_PHONE_NUMBER",
          message: "Invalid phone number.",
        },
      });
    } else if (!validator.isEmail(emailId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EMAIL",
          message: "Invalid email.",
        },
      });
    } else if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Enter a strong password",
        },
      });
    } else if (!["student", "recruitor"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_ROLE",
          message: "Invalid role",
        },
      });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          code: "USER_ALREADY_EXISTS",
          message: "User already exists. Please login",
        },
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

    const createdUser = await User.findById(user._id).select(
      "-password -profile -phoneNumber -isOAuthUser -authProviders"
    );

    if (!createdUser) {
      return res.status(400).json({
        success: false,
        error: {
          code: "USER_CREATION_FAILED",
          message: "Something went wrong while registering the user.",
        },
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
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
        error: {
          code: "MISSING_FIELDS",
          message: "Please fill all the fields.",
        },
      });
    }

    if (!validator.isEmail(emailId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EMAIL",
          message: "Invalid email.",
        },
      });
    }

    if (!["student", "recruitor"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_ROLE",
          message: "Invalid role.",
        },
      });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found. Please signup!",
        },
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_PASSWORD",
          message: "Invalid Password.",
        },
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        error: {
          code: "ROLE_MISMATCH",
          message: "Account doesn't exists with current role.",
        },
      });
    }

    const loggedInUser = await User.findById(user._id).select(
      "-password -profile -phoneNumber -isOAuthUser -authProviders"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
    });
    console.log(err.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select(
      "-password -profile -phoneNumber -isOAuthUser -authProviders"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
    });
    console.log(err);
  }
};

export const oauthCallback = async (req, res) => {
  try {
    const user = req.user?.user || req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          code: "OAUTH_FAILED",
          message: "OAuth failed. Please try again.",
        },
        user: null,
      });
    }

    const token = await user.generateAuthToken();

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("token", token, options);

    // Redirect user to frontend (without token in URL)
    return res
      .status(200)
      .redirect(`${process.env.FRONTEND_URL}/oauth/callback`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
    });
    console.log(err);
  }
};
