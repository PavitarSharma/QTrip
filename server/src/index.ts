import express from "express";
import { config } from "dotenv";
import App from "./services/ExpressApp";
import dbConnection from "./services/Database";
import { NODE_ENV, PORT } from "./config";

config();

const StartServer = async () => {
  const app = express();

  await dbConnection();

  await App(app);

  const environment = NODE_ENV;

  // Use the environment variable in your application logic
  if (environment === "development") {
    console.log("Running in development mode");
  } else if (environment === "production") {
    console.log("Running in production mode");
  } else {
    console.log("Running in an unknown environment");
  }

  app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
};

StartServer();