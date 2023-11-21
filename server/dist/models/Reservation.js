"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const mongoose_1 = require("mongoose");
const reservationSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    adventureId: { type: String, required: true },
    name: { type: String, required: true },
    adventureName: { type: String, required: true },
    person: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
    timestamps: true,
});
exports.Reservation = (0, mongoose_1.model)("Reservation", reservationSchema);
//# sourceMappingURL=Reservation.js.map