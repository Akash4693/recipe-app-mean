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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        console.log("authHeader:", authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "User not authenticated - Missing or malformed Authorization header",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        // verify the token
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decode);
        // check if decoding was successful
        if (!decode) {
            res.status(401).json({
                success: false,
                message: "Invalid token",
            });
            return; // Add missing return statement
        }
        req.id = decode.userId;
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return; // Add return statement in catch block
    }
});
exports.isAuthenticated = isAuthenticated;
