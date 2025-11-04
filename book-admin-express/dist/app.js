import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import './model/index.js';
import BookRouter from './routes/book.js';
import BorrowRouter from './routes/borrow.js';
import CategoryRouter from './routes/category.js';
import UserRouter from './routes/user.js';
import LoginRouter from './routes/login.js';
import LogoutRouter from './routes/logout.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 得调用app本身
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
import { expressjwt } from 'express-jwt';
import { SECRET_KEY } from './constant.js';
app.use(expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({
    path: ['/api/login'],
}));
// 捕获 JWT 错误
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        // Token 过期或无效
        return res.status(401).json({
            code: 401,
            message: "登录已过期，请重新登录",
        });
    }
    next(err);
});
// 这里是根目录
app.get('/', (req, res) => {
    res.send('Book Admin System API is running');
});
// 最后网页访问的URL就是app这里的和router的结合
app.use('/api/books', BookRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/borrows', BorrowRouter);
app.use('/api/users', UserRouter);
app.use('/api/login', LoginRouter);
app.use('/api/logout', LogoutRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.listen('3005', () => {
    console.log('Server is running on http://localhost:3005');
});
//ES module 写法
export default app;
//# sourceMappingURL=app.js.map