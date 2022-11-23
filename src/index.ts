import express from 'express';

import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import { loginRouter, logoutRouter, signupRouter } from './routes/user.routes';

import {
  createPostRouter,
  deletePostRouter,
  getPostsRouter,
  updatePostRouter,
} from './routes/post.routes';

import { JwtPayload } from 'jsonwebtoken';

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser());

// const postRouter = require('./routes/post.routes');

app.get('/', (req, res) => {
  res.send('Hallo das ist die erste Nachicht');
});

//Routes

//user routes
app.use('/api', signupRouter);
app.use('/api', loginRouter);
app.use('/api', logoutRouter);

//post routes
app.use('/api', createPostRouter);
app.use('/api', updatePostRouter);
app.use('/api', deletePostRouter);
app.use('/api', getPostsRouter);

app.listen(port, () => {
  console.log(`server läuft auf http://localhost:${port} !!!`);
});
