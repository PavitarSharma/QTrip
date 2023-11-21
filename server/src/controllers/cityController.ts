import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { City } from "../models";

export const addCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { city, description } = req.body;
    const cityId = city.replace(/\s+/g, "-").toLowerCase();

    if (!city || !description)
      return next(createError(400, "All fields are required!"));

    if (!req.file)
      return next(createError(400, "Please upload the city image!"));

    const existCity = await City.findOne({ city });

    if (existCity) return next(createError("This city already exist"));

    const saveCity = await City.create({
      id: cityId,
      city: city,
      description,
      image: req.file?.filename,
    });

    res.status(201).json(saveCity);
  }
);

export const getAllCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.city;
    let query: { city?: string } = {};

    if (typeof name === "string") {
      query.city = name;
    }

    const cities = await City.find(query);

    if (cities.length === 0) return next(createError(404, "No city available"));

    res.status(200).json(cities);
  }
);

export const getCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const city = await City.findOne({ id: req.params.id });

    if (!city) return next(createError(404, "No city available"));

    res.status(200).json(city);
  }
);

export const updateCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const city = await City.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });

    if (!city) return next(createError(404, "No city available"));

    res.status(200).json(city);
  }
);

export const deleteCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const city = await City.findOneAndDelete({ id: req.params.id });

    if (!city) return next(createError(404, "No city available"));

    res.status(200).json(city);
  }
);
