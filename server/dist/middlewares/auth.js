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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const models_1 = require("../models");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const authHeaderString = Array.isArray(authHeader)
        ? authHeader[0]
        : authHeader;
    if (!(authHeaderString === null || authHeaderString === void 0 ? void 0 : authHeaderString.startsWith("Bearer "))) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeaderString.split(" ")[1];
    jsonwebtoken_1.default.verify(token, config_1.ACCESS_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(403).json({ message: "Forbidden" });
        const userPayload = decoded;
        const user = yield models_1.User.findById(userPayload._id);
        req.user = user;
        next();
    }));
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map