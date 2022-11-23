"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsRouter = exports.updatePostRouter = exports.deletePostRouter = exports.createPostRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
exports.createPostRouter = express_1.default.Router();
exports.deletePostRouter = express_1.default.Router();
exports.updatePostRouter = express_1.default.Router();
exports.getPostsRouter = express_1.default.Router();
exports.createPostRouter.route('/post/create').post(isLoggedIn_1.isLoggedIn, post_controller_1.createPost);
exports.deletePostRouter.route('/post/update/:id').put(isLoggedIn_1.isLoggedIn, post_controller_1.updatePost);
exports.updatePostRouter.route('/post/delete/:id').delete(isLoggedIn_1.isLoggedIn, post_controller_1.deletePost);
exports.getPostsRouter.route('/post/posts').get(post_controller_1.getPosts);
//# sourceMappingURL=post.routes.js.map