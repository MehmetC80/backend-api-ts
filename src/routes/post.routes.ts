import express from 'express';

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/post.controller';
import { isLoggedIn } from '../middleware/isLoggedIn';

export const createPostRouter = express.Router();
export const deletePostRouter = express.Router();
export const updatePostRouter = express.Router();
export const getPostsRouter = express.Router();

createPostRouter.route('/post/create').post(isLoggedIn, createPost);

deletePostRouter.route('/post/update/:id').put(isLoggedIn, updatePost);

updatePostRouter.route('/post/delete/:id').delete(isLoggedIn, deletePost);

getPostsRouter.route('/post/posts').get(getPosts);
