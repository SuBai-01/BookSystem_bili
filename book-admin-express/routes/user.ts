import express from 'express';
import type { Response, Request } from 'express';
import {User} from '../model/index.js';
import { SECRET_KEY } from '../constant.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
//得同时运行 npm run dev  and  npm run run 才行，前者编译成ts，后者运行node

//图书列表获取
router.get('/', async (req: Request, res: Response) => {
  const {current=1, pageSize=20, name, status} = req.query;
  const filter = {
    ...(name && { name }),
    ...(status && { status }),
  };
  const data = await User.find(filter)
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize));
  const total = await User.countDocuments(filter);
  return res.status(200).json({data, total});
});

//图书新建
router.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const userModel = new User({ ...body });
    userModel.save();
    return res.json({success: true, code: 200});
});

//图书删除 ‘book/1’
router.delete('/:id', async(req: Request, res: Response) => {
    const{ id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({success: true});
})

//图书详情获取
router.get('/:id', async(req: Request, res: Response) => {
    const{ id } = req.params;
    const user = await User.findById(id);
    if(user) {
      console.log(user);
      return res.status(200).json({data: user, success: true});
    }else{
      return res.status(500).json({message: '用户不存在'});
    }
})

//图书更新
router.put('/:id', async(req: Request, res: Response) => {
    const body = req.body;
    const {id} = req.params;
    await User.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: true });
});

// //登录
// router.post('/login', async(req: Request, res: Response) => {
//     const { name, password } = req.body;
//     const user = await User.findOne({ name, password });  
//     if(user) {
//       const token = jwt.sign({ id: user._id} , SECRET_KEY, { expiresIn: '1h' } );
//       return res.status(200).json({data: user, success: true, token});
//     }else {
//       alert("用户名或密码错误");
//       return res.status(500).json({message: '用户名或密码错误'});
//     }
// });

export default router;