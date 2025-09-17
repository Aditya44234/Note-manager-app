import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register a new user and save its info in the DB
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Check whether the user is present or not

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // If not then lets create a new USER in the DB
    const newUser = await User.create({
      name,
      email,
      password, // We will get the password hased by pre-save middleware
    });

    // Generate JWT token for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24hr",
    });
    res.status(201).json({
      success: true,
      messsege: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsege: "Registration failed",
      error: error.message,
    });
  }
};

// for Login of the user

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        succes: false,
        messege: "User Not found",
      });
    }

    // Verifying the password here
    const passsMatch = await user.comparePassword(password);
    if (!passMatch) {
      return res.status(401).json({
        success: false,
        messege: "Invalid email or password",
      });
    }

    // here the token is Genereted
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24hr",
    });

    res.status(200).json({
      success: true,
      messege: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messege: "Login Failed try  again",
      error: error.message,
    });
  }
};
