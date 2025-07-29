import { User } from "../models/User";
import { Request, Response } from "express";
import { hashPassword, compare } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // find if user exists already

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    // hash password
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      // jwt token
      await newUser.save();
      generateToken(newUser._id.toString(), res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      console.log("invalid user data");
      res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("register error");
    res.status(500).json({ message: "register error" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate new token
    generateToken(user._id.toString(), res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("login error");
    res.status(500).json({ message: "login error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log("logout error");
    res.status(500).json({ message: "logout error" });
  }
};
