import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message:
          "User not authenticated - Missing or malformed Authorization header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    // verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
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
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return; // Add return statement in catch block
  }
};
