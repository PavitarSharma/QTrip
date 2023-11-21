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
exports.logout = exports.login = exports.signUp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const services_1 = require("../services");
const config_1 = require("../config");
/*
    @desc Register
    @route POST /auth/register
    @access Public
*/
exports.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return next((0, http_errors_1.default)(400, "All fileds are required!"));
    const existUser = yield (0, services_1.finUser)("", email);
    if (existUser)
        return next((0, http_errors_1.default)(409, "User already exist!"));
    const salt = yield (0, services_1.generateSalt)();
    const hashPassword = yield (0, services_1.generatePassword)(password, salt);
    const user = yield (0, services_1.createUser)({
        name,
        email,
        password: hashPassword,
    });
    res.status(201).json(user);
}));
/*
    @desc Login
    @route POST /auth/login
    @access Public
*/
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next((0, http_errors_1.default)(400, "All fileds are required!"));
    const user = yield (0, services_1.finUser)("", email);
    if (!user)
        return next((0, http_errors_1.default)(400, "Invalid credentials"));
    const hasPassword = yield (0, services_1.validatePassword)(password, user.password);
    if (!hasPassword)
        return next((0, http_errors_1.default)(400, "Invalid credentials"));
    const { access_token, refresh_token } = yield (0, services_1.generateSignature)({
        _id: user._id,
        email: user.email,
        name: user.name,
    });
    res.cookie("qtripJWT", refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: config_1.NODE_ENV === "production" ? true : false,
    });
    res.status(200).json({
        accessToken: access_token,
        user,
    });
}));
/*
    @desc Logout
    @route POST /auth/logout
    @access Private - Just to clear cookie if user is looged in and if cookie exist.
*/
exports.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.qtripJWT))
        return next((0, http_errors_1.default)(240, "No content"));
    res.clearCookie("qtripJWT", {
        httpOnly: true,
        secure: config_1.NODE_ENV === "production" ? true : false,
    });
    res.status(200).json({ message: "Logout successfully done." });
}));
//# sourceMappingURL=authController.js.map