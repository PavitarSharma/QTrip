import { UserPayload } from "./User";

export interface SignUpInputs {
  name: string;
  email: string;
  password: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export type AuthPayload = UserPayload;
