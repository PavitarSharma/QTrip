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
exports.updateUserPassword = exports.uploadUserImage = exports.updateProfile = exports.userProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const services_1 = require("../services");
const models_1 = require("../models");
/*
    @desc Get User Profile
    @route GET /user/profile
    @access Private
*/
exports.userProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield models_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
        .populate("reservations")
        .populate("favorites");
    if (!user)
        return next((0, http_errors_1.default)(404, "User not found!"));
    res.status(200).json(user);
}));
/*
    @desc Update User Profile
    @route PUT /user/profile
    @access Private
*/
exports.updateProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name, country, state, city, phone, pinCode } = (req.body);
    const requestBody = {
        name,
        phone,
        address: {
            country,
            state,
            city,
            pinCode,
        },
    };
    const user = yield models_1.User.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, requestBody, {
        new: true,
    });
    if (!user)
        return next((0, http_errors_1.default)(404, "No user found"));
    res.status(200).json(user);
}));
exports.uploadUserImage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = yield models_1.User.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    if (!user)
        return next((0, http_errors_1.default)(404, "No user found"));
    user.image = req.file ? req.file.filename : "";
    yield user.save();
    res.status(200).json(user);
}));
exports.updateUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const user = yield models_1.User.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
    if (!user)
        return next((0, http_errors_1.default)(404, "No user found"));
    const { newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword)
        return next((0, http_errors_1.default)(400, "Please add your new and confirm password to update your password"));
    if (confirmPassword !== newPassword)
        return next((0, http_errors_1.default)(400, "Password does not match."));
    const salt = yield (0, services_1.generateSalt)();
    const hashPassword = yield (0, services_1.generatePassword)(newPassword, salt);
    user.password = hashPassword;
    yield user.save();
    res.status(200).json(user);
}));
//# sourceMappingURL=userController.js.map