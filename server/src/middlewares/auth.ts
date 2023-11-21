import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_SECRET } from "../config";
import { AuthPayload } from "../types";
import { User } from "../models";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload | null;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;


  const authHeaderString = Array.isArray(authHeader)
    ? authHeader[0]
    : authHeader;

  if (!authHeaderString?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeaderString.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    const userPayload = decoded as AuthPayload;

    const user = await User.findById(userPayload._id);
    req.user = user;
    next();
  });
};
