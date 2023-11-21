import { Schema, model, Document } from "mongoose";

interface IAddress {
  country?: string;
  city?: string;
  state?: string;
  pinCode?: number;
}

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  address: IAddress;
  phone: number;
  reservations: [any];
  favorites: [any];
}

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    image: { type: String, default: "", trim: true },
    phone: { type: Number },
    address: {
      country: String,
      state: String,
      city: String,
      pinCode: Number,
    },

    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Adventure",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const User = model<UserDoc>("User", userSchema);
