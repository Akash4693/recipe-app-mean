import jwt from "jsonwebtoken";
import { IUser } from "../models/userModal";

export const generateToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: '1d' });
};
