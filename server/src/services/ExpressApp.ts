import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import createHttpError from "http-errors";
import { adventureRoutes, authRoutes, cityRoutes, userRoutes } from "../routes";

export default async (app: Application) => {
  app.use(
    cors({
      origin: ["http://localhost:3002", "*", "https://qtrip-travel-journey.netlify.app"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  app.use("/", express.static(path.join(__dirname, "../images")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.get("/", (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Hello from the qtrip backend",
    });
  });

  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/", cityRoutes);
  app.use("/adventure", adventureRoutes);

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError.NotFound());
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  };

  app.use(errorHandler);

  return app;
};
