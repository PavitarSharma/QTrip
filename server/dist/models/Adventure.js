"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adventure = void 0;
const mongoose_1 = require("mongoose");
const adventureSchema = new mongoose_1.Schema({
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
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
    timestamps: true,
});
exports.Adventure = (0, mongoose_1.model)("Adventure", adventureSchema);
//# sourceMappingURL=Adventure.js.map