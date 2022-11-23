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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const prisma_1 = require("../lib/prisma");
//create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug, body, title, authorId } = req.body;
        //validation
        if (!authorId || !slug || !title || !body) {
            return res.status(400).json({
                error: 'author, slug, titel und body müssen vollständig sein',
            });
        }
        const result = yield prisma_1.prisma.post.create({
            data: {
                slug: slug,
                body: body,
                title: title,
                author: { connect: { id: authorId } },
            },
        });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        const result = yield prisma_1.prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                body: body,
            },
        });
        res.status(201).json(result);
    }
    catch (err) {
        res
            .status(400)
            .json({ error: err, msg: `post mit der id:${id} existiert nicht` });
    }
});
exports.updatePost = updatePost;
// delete a post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield prisma_1.prisma.post.delete({
            where: {
                id: id,
            },
        });
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({
            error: err,
            msg: `post mit der id:${id} konnte nicht gelöscht werden`,
        });
    }
});
exports.deletePost = deletePost;
// get all posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.post.findMany();
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err, msg: 'keine Posts in der DB' });
    }
});
exports.getPosts = getPosts;
//# sourceMappingURL=post.controller.js.map