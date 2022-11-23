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
exports.isLoggedIn = void 0;
const prisma_1 = require("../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.cookieToken;
        if (!token) {
            return res.status(400).json({ msg: 'bitte log dich ein' });
        }
        const { decoded } = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        req.user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        next();
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=isLoggedIn.js.map