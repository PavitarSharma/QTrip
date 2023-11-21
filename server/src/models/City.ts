import mongoose, { Schema, Document, model } from "mongoose";

export interface CityDoc extends Document {
  id: string;
  city: string;
  description: string;
  image: string;
  adventures: any;
}

const citySchema = new Schema(
  {
    id: { type: String, required: true },
    city: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    adventures: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adventure",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const City = model<CityDoc>("City", citySchema);
