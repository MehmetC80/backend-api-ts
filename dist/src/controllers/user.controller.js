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
exports.logout = exports.login = exports.signup = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const cookieToken_1 = require("../helpers/cookieToken");
//user signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        //check
        // check name,email,password is set
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ error: 'Email, Passwort oder Name müssen vollständig sein' });
        }
        // name is to short or empty
        if (name === '' || name.length <= 2) {
            return res.status(400).json({ error: 'Name ist zu kurz' });
        }
        // email is not vailde
        if (!validator_1.default.isEmail(email)) {
            return res.status(400).json({ error: 'Email ist nicht valide' });
        }
        //generating salt
        const salt = yield bcrypt_1.default.genSalt(10);
        // hashed password
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield prisma_1.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        // send user a token
        (0, cookieToken_1.cookieToken)(user, res);
        console.log(user);
        // return res.status(201).json({ user, msg: 'user in die DB eingefügt' });
    }
    catch (err) {
        res.status(400).json({
            error: err,
            msg: 'server fehler user kann nicht erstellt werden',
        });
    }
});
exports.signup = signup;
// user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //take info from user
        const { email, password } = req.body;
        //checks
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: 'Email und Passwort  müssen vollständig sein' });
        }
        //find user based n email
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        // When there is no user
        if (!user) {
            return res.status(401).json({ msg: 'User ist nicht registiert' });
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        //user us there
        // pasword mismatch
        if (!match) {
            // throw Error('Password ist falsch!!!');
            return res.status(400).json({ error: 'Password ist falsch!!!' });
        }
        //user is there and validated
        (0, cookieToken_1.cookieToken)(user, res);
        console.log(user, cookieToken_1.cookieToken.name);
    }
    catch (err) {
        res.status(400).json({
            error: err,
            msg: 'server fehler user kann nicht eingeloggt werden',
        });
    }
});
exports.login = login;
//logout user
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('cookieToken');
        res.status(200).json({ success: true });
    }
    catch (err) {
        return res
            .status(400)
            .json({ error: err, msg: 'logout ist fehlgeschlagen' });
    }
});
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map