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
exports.deleteCity = exports.updateCity = exports.getCity = exports.getAllCity = exports.addCity = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
exports.addCity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { city, description } = req.body;
    const cityId = city.replace(/\s+/g, "-").toLowerCase();
    if (!city || !description)
        return next((0, http_errors_1.default)(400, "All fields are required!"));
    if (!req.file)
        return next((0, http_errors_1.default)(400, "Please upload the city image!"));
    const existCity = yield models_1.City.findOne({ city });
    if (existCity)
        return next((0, http_errors_1.default)("This city already exist"));
    const saveCity = yield models_1.City.create({
        id: cityId,
        city: city,
        description,
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
    });
    res.status(201).json(saveCity);
}));
exports.getAllCity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.city;
    let query = {};
    if (typeof name === "string") {
        query.city = name;
    }
    const cities = yield models_1.City.find(query);
    if (cities.length === 0)
        return next((0, http_errors_1.default)(404, "No city available"));
    res.status(200).json(cities);
}));
exports.getCity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield models_1.City.findOne({ id: req.params.id });
    if (!city)
        return next((0, http_errors_1.default)(404, "No city available"));
    res.status(200).json(city);
}));
exports.updateCity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield models_1.City.findOneAndUpdate({ id: req.params.id }, req.body, {
        new: true,
    });
    if (!city)
        return next((0, http_errors_1.default)(404, "No city available"));
    res.status(200).json(city);
}));
exports.deleteCity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield models_1.City.findOneAndDelete({ id: req.params.id });
    if (!city)
        return next((0, http_errors_1.default)(404, "No city available"));
    res.status(200).json(city);
}));
//# sourceMappingURL=cityController.js.map