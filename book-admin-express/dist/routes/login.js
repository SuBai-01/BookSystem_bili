import express from 'express';
import { User } from '../model/index.js';
import { SECRET_KEY } from '../constant.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
//登录   前端/api/login  这里login单拿出来就不需要再写/login, app里面有写
router.post('/', async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    // console.log('user is:', user);
    if (user?.password === password) {
        const token = jwt.sign({ id: user?._id }, SECRET_KEY, { expiresIn: '1h' });
        if (user?.status === 'off') {
            // alert("用户已被禁用");  //在node里面无效
            return res.status(501).json({ message: '用户已被禁用' });
        }
        else {
            return res.status(200).json({ data: user, success: true, token });
        }
    }
    else {
        return res.status(500).json({ message: '用户名或密码错误' });
    }
});
export default router;
//# sourceMappingURL=login.js.map