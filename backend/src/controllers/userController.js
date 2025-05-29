"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModal_1 = __importDefault(require("../models/userModal"));
const generateToken_1 = require("../utils/generateToken");
const generateVerificationCode_1 = require("../utils/generateVerificationCode");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        let user = yield userModal_1.default.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exist with this email"
            });
            return; // Add return to prevent further execution
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = (0, generateVerificationCode_1.generateVerificationCode)();
        user = yield userModal_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        const token = (0, generateToken_1.generateToken)(user);
        const userWithoutPassword = yield userModal_1.default.findOne({ email }).select("-password");
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword,
            jwt: token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("calling login");
        const { email, password } = req.body;
        console.log(`req.body: ${email} password ${password}`);
        const user = yield userModal_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
            return;
        }
        console.log("user", user);
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
            return;
        }
        const token = (0, generateToken_1.generateToken)(user);
        yield user.save();
        // Remove password from user object before sending response
        const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullName}`, // Fixed: use 'fullname' consistently
            user: userWithoutPassword,
            jwt: token
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        const user = yield userModal_1.default.findById(userId).select("-password");
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkAuth = checkAuth;
