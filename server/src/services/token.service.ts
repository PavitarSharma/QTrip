import jwt from "jsonwebtoken";
import { AuthPayload } from "../types";
import {
  ACCESS_TOKEN_EXIRES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXIRES,
  REFRESH_TOKEN_SECRET,
} from "../config";

export const generateSignature = async (payload: AuthPayload) => {
  const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d", 
  });

  return {
    access_token,
    refresh_token,
  };
};
