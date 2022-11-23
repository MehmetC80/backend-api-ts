"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJwtToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId: userId }, `${process.env.JWT_SECRET}`, {
        expiresIn: '1d',
    });
};
exports.getJwtToken = getJwtToken;
//# sourceMappingURL=getJwtToken.js.map