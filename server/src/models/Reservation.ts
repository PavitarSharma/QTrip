import { Schema, model, Document } from "mongoose";

export interface ReservationDoc extends Document {
  userId: string;
  name: string;
  date: Date;
  person: number;
  price: number;
  adventureId: string;
  adventureName: string;
}

const reservationSchema = new Schema<ReservationDoc>(
  {
    userId: { type: String, required: true },
    adventureId: { type: String, required: true },
    name: { type: String, required: true },
    adventureName: { type: String, required: true },
    person: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
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

export const Reservation = model<ReservationDoc>(
  "Reservation",
  reservationSchema
);
