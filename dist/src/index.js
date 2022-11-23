"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_routes_1 = require("./routes/user.routes");
const post_routes_1 = require("./routes/post.routes");
const app = (0, express_1.default)();
const port = process.env.PORT;
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// cookie middleware
app.use((0, cookie_parser_1.default)());
// const postRouter = require('./routes/post.routes');
app.get('/', (req, res) => {
    res.send('Hallo das ist die erste Nachicht');
});
//Routes
//user routes
app.use('/api', user_routes_1.signupRouter);
app.use('/api', user_routes_1.loginRouter);
app.use('/api', user_routes_1.logoutRouter);
//post routes
app.use('/api', post_routes_1.createPostRouter);
app.use('/api', post_routes_1.updatePostRouter);
app.use('/api', post_routes_1.deletePostRouter);
app.use('/api', post_routes_1.getPostsRouter);
app.listen(port, () => {
    console.log(`server läuft auf http://localhost:${port} !!!`);
});
//# sourceMappingURL=index.js.map