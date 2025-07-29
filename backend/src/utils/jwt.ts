import jwt from "jsonwebtoken";
import { Response } from "express";
export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // miliseconds
    httpOnly: true, // prevent xss attacks cross site scripting attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
