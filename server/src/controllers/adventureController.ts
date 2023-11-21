import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { AdventureInput, ReserveAdventureInput } from "../types/City";
import { addAdventure, finUser, findAdventure } from "../services";
import { Adventure, Reservation } from "../models";

export const addCityAdventure = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      subtitle,
      category,
      cityId,
      costPerHead,
      currency,
      content,
      duration,
      image,
      images,
    } = <AdventureInput>req.body;

    if (
      !name ||
      !subtitle ||
      !category ||
      !cityId ||
      !costPerHead ||
      !currency ||
      !content ||
      !duration
    ) {
      return next(createError(400, "All fields are required!"));
    }

    const adventure = await addAdventure({
      name,
      subtitle,
      category,
      cityId,
      costPerHead,
      currency,
      content,
      duration,
      image,
      images,
    });

    res.status(201).json(adventure);
  }
);

export const getAdventuresWithCity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const adventures = await Adventure.find({ cityId: req.query.city });

    if (adventures.length === 0)
      return next(
        createError(404, "No adventures are available with this city.")
      );

    res.status(200).json(adventures);
  }
);

export const getAdventureWithId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const adventure = await Adventure.findById(req.params.id);

    if (!addAdventure)
      return next(createError(404, "No adventures are available"));

    res.status(200).json(adventure);
  }
);

export const reserveAdventure = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await finUser(req.user?._id);
    if (!user) return next(createError(404, "User not found!"));
    const { name, price, person, date, adventureId } = <ReserveAdventureInput>(
      req.body
    );

    if (!name || !price || !person || !date || !adventureId)
      return next(createError(400, "All fields are required!"));

    const adventure = await findAdventure(adventureId);

    if (!adventure) return next(createError(404, "Could not find Adventure"));

    if (adventure.reserved)
      return next(createError(400, "This adventure already reserved."));

    const reservedAdventure = await Reservation.create({
      userId: user?._id,
      adventureId: adventure._id,
      adventureName: adventure.name,
      date,
      price,
      person,
      name,
    });

    user?.reservations.push(reservedAdventure);
    await user.save();
    adventure.reserved = true;
    adventure.available = false;
    await adventure.save();

    res.status(200).json(reservedAdventure);
  }
);

export const favoriteAdventure = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await finUser(req.user?._id);

    if (!user) return next(createError(404, "User not found!"));

    const { isFavorite } = req.body;

    const adventure = await findAdventure(req.params.id);

    if (!adventure) return next(createError(404, "Could not find Adventure"));
    console.log(isFavorite);
    adventure.isFavorite = isFavorite;
    adventure.userId = user?._id;

    await adventure.save();

    if (isFavorite) {
      user.favorites.push(adventure);
      await user.save();
    }
    // else {
    //   const findFavoriteId = user?.favorites.find
    // }

    res.status(200).json(adventure);
  }
);

export const ratingAdventure = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await finUser(req.user?._id);

    if (!user) return next(createError(404, "User not found!"));

    const { reviews } = req.body;

    const adventure = await findAdventure(req.params.id);

    if (!adventure) return next(createError(404, "Could not find Adventure"));

    if (reviews > 0) {
      adventure.reviews = reviews;
      adventure.userId = user?._id;
      await adventure.save();

      res.status(200).json(adventure);
    } else {
      return next(
        createError(
          400,
          "Something went wrong when you are giving to review to your adventure."
        )
      );
    }
  }
);
