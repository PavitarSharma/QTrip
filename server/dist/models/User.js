"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Reservation",
        },
    ],
    favorites: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Adventure",
        },
    ],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=User.js.map