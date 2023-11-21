import { Schema, model, Document } from "mongoose";

export interface AdventureDoc extends Document {
  cityId: string;
  userId: string;
  name: string;
  costPerHead: number;
  currency: string;
  image: string;
  duration: number;
  category: string;
  subtitle: string;
  images: [string];
  content: string;
  available: boolean;
  reserved: boolean;
  reviews: number;
  isFavorite: boolean;
}

const adventureSchema = new Schema<AdventureDoc>(
  {
    cityId: { type: String, required: true },
    userId: { type: String },
    name: { type: String, required: true },
    costPerHead: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    image: { type: String, required: true },
    duration: { type: Number, required: true },
    category: { type: String, required: true },
    subtitle: { type: String },
    images: [String],
    content: { type: String, required: true },
    available: { type: Boolean, default: true },
    reserved: { type: Boolean, default: false },
    reviews: { type: Number, default: 0 },
    isFavorite: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const Adventure = model<AdventureDoc>("Adventure", adventureSchema);
