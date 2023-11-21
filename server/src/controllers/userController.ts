import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { finUser, generatePassword, generateSalt } from "../services";
import { User } from "../models";
import { UserEditInput } from "../types";

/* 
    @desc Get User Profile
    @route GET /user/profile
    @access Private
*/

export const userProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id)
      .populate("reservations")
      .populate("favorites");

    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(user);
  }
);

/* 
    @desc Update User Profile
    @route PUT /user/profile
    @access Private
*/

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, country, state, city, phone, pinCode } = <UserEditInput>(
      req.body
    );

    const requestBody = {
      name,
      phone,
      address: {
        country,
        state,
        city,
        pinCode,
      },
    };

    const user = await User.findByIdAndUpdate(req.user?._id, requestBody, {
      new: true,
    });

    if (!user) return next(createError(404, "No user found"));

    res.status(200).json(user);
  }
);

export const uploadUserImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id);

    if (!user) return next(createError(404, "No user found"));

    user.image = req.file ? req.file.filename : "";
    await user.save();

    res.status(200).json(user);
  }
);

export const updateUserPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id);
    if (!user) return next(createError(404, "No user found"));

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword)
      return next(
        createError(
          400,
          "Please add your new and confirm password to update your password"
        )
      );

    if (confirmPassword !== newPassword)
      return next(createError(400, "Password does not match."));

    const salt = await generateSalt();
    const hashPassword = await generatePassword(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).json(user);
  }
);
