import { User } from "../models";
import { SignUpInputs } from "../types";
import bcrypt from "bcrypt";

export const createUser = async (body: any) => {
  const { name, email, password, reservations } = body;

  return await User.create({
    name,
    email,
    password,
    reservations
  });
};

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};
