"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingAdventure = exports.favoriteAdventure = exports.reserveAdventure = exports.getAdventureWithId = exports.getAdventuresWithCity = exports.addCityAdventure = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const services_1 = require("../services");
const models_1 = require("../models");
exports.addCityAdventure = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, subtitle, category, cityId, costPerHead, currency, content, duration, image, images, } = req.body;
    if (!name ||
        !subtitle ||
        !category ||
        !cityId ||
        !costPerHead ||
        !currency ||
        !content ||
        !duration) {
        return next((0, http_errors_1.default)(400, "All fields are required!"));
    }
    const adventure = yield (0, services_1.addAdventure)({
        name,
        subtitle,
        category,
        cityId,
        costPerHead,
        currency,
        content,
        duration,
        image,
        images,
    });
    res.status(201).json(adventure);
}));
exports.getAdventuresWithCity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adventures = yield models_1.Adventure.find({ cityId: req.query.city });
    if (adventures.length === 0)
        return next((0, http_errors_1.default)(404, "No adventures are available with this city."));
    res.status(200).json(adventures);
}));
exports.getAdventureWithId = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adventure = yield models_1.Adventure.findById(req.params.id);
    if (!services_1.addAdventure)
        return next((0, http_errors_1.default)(404, "No adventures are available"));
    res.status(200).json(adventure);
}));
exports.reserveAdventure = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield (0, services_1.finUser)((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user)
        return next((0, http_errors_1.default)(404, "User not found!"));
    const { name, price, person, date, adventureId } = (req.body);
    if (!name || !price || !person || !date || !adventureId)
        return next((0, http_errors_1.default)(400, "All fields are required!"));
    const adventure = yield (0, services_1.findAdventure)(adventureId);
    if (!adventure)
        return next((0, http_errors_1.default)(404, "Could not find Adventure"));
    if (adventure.reserved)
        return next((0, http_errors_1.default)(400, "This adventure already reserved."));
    const reservedAdventure = yield models_1.Reservation.create({
        userId: user === null || user === void 0 ? void 0 : user._id,
        adventureId: adventure._id,
        adventureName: adventure.name,
        date,
        price,
        person,
        name,
    });
    user === null || user === void 0 ? void 0 : user.reservations.push(reservedAdventure);
    yield user.save();
    adventure.reserved = true;
    adventure.available = false;
    yield adventure.save();
    res.status(200).json(reservedAdventure);
}));
exports.favoriteAdventure = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield (0, services_1.finUser)((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    if (!user)
        return next((0, http_errors_1.default)(404, "User not found!"));
    const { isFavorite } = req.body;
    const adventure = yield (0, services_1.findAdventure)(req.params.id);
    if (!adventure)
        return next((0, http_errors_1.default)(404, "Could not find Adventure"));
    console.log(isFavorite);
    adventure.isFavorite = isFavorite;
    adventure.userId = user === null || user === void 0 ? void 0 : user._id;
    yield adventure.save();
    if (isFavorite) {
        user.favorites.push(adventure);
        yield user.save();
    }
    // else {
    //   const findFavoriteId = user?.favorites.find
    // }
    res.status(200).json(adventure);
}));
exports.ratingAdventure = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = yield (0, services_1.finUser)((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    if (!user)
        return next((0, http_errors_1.default)(404, "User not found!"));
    const { reviews } = req.body;
    const adventure = yield (0, services_1.findAdventure)(req.params.id);
    if (!adventure)
        return next((0, http_errors_1.default)(404, "Could not find Adventure"));
    if (reviews > 0) {
        adventure.reviews = reviews;
        adventure.userId = user === null || user === void 0 ? void 0 : user._id;
        yield adventure.save();
        res.status(200).json(adventure);
    }
    else {
        return next((0, http_errors_1.default)(400, "Something went wrong when you are giving to review to your adventure."));
    }
}));
//# sourceMappingURL=adventureController.js.map