

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModal";
import { generateToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exist with this email"
            });
            return; // Add return to prevent further execution
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();

        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        
        const token = generateToken(user);

        const userWithoutPassword = await User.findOne({ email }).select("-password");
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword,
            jwt: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("calling login")
        const { email, password } = req.body;

        console.log(`req.body: ${email} password ${password}`)

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
            return;
        }

        console.log("user", user)

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
            return;
        }

       const token = generateToken(user);

        await user.save();

        // Remove password from user object before sending response
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`, // Fixed: use 'fullname' consistently
            user: userWithoutPassword,
            jwt: token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return; // Add return to prevent further execution
        }
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};