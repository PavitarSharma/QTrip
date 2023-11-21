import { Adventure } from "../models";
import { AdventureInput } from "../types/City";

export const addAdventure = async (body: AdventureInput) => {
  return await Adventure.create(body);
};

export const findAdventure = async (id: string) => {
  return await Adventure.findById(id);
};
