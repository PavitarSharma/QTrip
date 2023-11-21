import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { LoginInputs, SignUpInputs } from "../types";
import {
  createUser,
  finUser,
  generatePassword,
  generateSalt,
  generateSignature,
  validatePassword,
} from "../services";


/* 
    @desc Register
    @route POST /auth/register
    @access Public
*/

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = <SignUpInputs>req.body;

    if (!name || !email || !password)
      return next(createError(400, "All fileds are required!"));

    const existUser = await finUser("", email);
    if (existUser) return next(createError(409, "User already exist!"));

    const salt = await generateSalt();
    const hashPassword = await generatePassword(password, salt);
    const user = await createUser({
      name,
      email,
      password: hashPassword,
  
    });

    res.status(201).json(user);
  }
);

/* 
    @desc Login
    @route POST /auth/login
    @access Public
*/

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <LoginInputs>req.body;

    if (!email || !password)
      return next(createError(400, "All fileds are required!"));

    const user = await finUser("", email);
    if (!user) return next(createError(400, "Invalid credentials"));

    const hasPassword = await validatePassword(password, user.password);
    if (!hasPassword) return next(createError(400, "Invalid credentials"));

    const { access_token, refresh_token } = await generateSignature({
      _id: user._id,
      email: user.email,
      name: user.name,
    });

    res.cookie("qtripJWT", refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: false,
    });

    res.status(200).json({
      accessToken: access_token,
      user,
    });
  }
);

/* 
    @desc Logout
    @route POST /auth/logout
    @access Private - Just to clear cookie if user is looged in and if cookie exist.
*/

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    if (!cookies?.qtripJWT) return next(createError(240, "No content"));

    res.clearCookie("qtripJWT", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ message: "Logout successfully done." });
  }
);
