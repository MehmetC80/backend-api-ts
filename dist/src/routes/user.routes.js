"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = exports.loginRouter = exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
exports.signupRouter = express_1.default.Router();
exports.loginRouter = express_1.default.Router();
exports.logoutRouter = express_1.default.Router();
exports.signupRouter.route('/signup').post(user_controller_1.signup);
exports.loginRouter.route('/login').post(user_controller_1.login);
exports.logoutRouter.route('/logout').get(user_controller_1.logout);
//# sourceMappingURL=user.routes.js.map