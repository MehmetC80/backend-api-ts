import express from 'express';
import { signup, login, logout } from '../controllers/user.controller';

export const signupRouter = express.Router();
export const loginRouter = express.Router();
export const logoutRouter = express.Router();

signupRouter.route('/signup').post(signup);
loginRouter.route('/login').post(login);
logoutRouter.route('/logout').get(logout);
