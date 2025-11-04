import express from 'express';
import { Borrow } from '../model/index.js';
const router = express.Router();
//得同时运行 npm run dev  and  npm run run 才行，前者编译成ts，后者运行node
//借阅列表获取
router.get('/', async (req, res) => {
    const { current = 1, pageSize = 20, book, status, borrowUser } = req.query;
    const filter = {
        ...(book && { book }),
        ...(status && { status }),
        ...(borrowUser && { borrowUser }),
    };
    const data = await Borrow.find(filter)
        .skip((Number(current) - 1) * Number(pageSize))
        .populate(['borrowUser', 'book'])
        .limit(Number(pageSize));
    const total = await Borrow.countDocuments(filter);
    console.log(total);
    return res.status(200).json({ data, total });
});
//借阅新建
router.post('/', async (req, res) => {
    const { book, borrowUser } = req.body;
    const oldBorrow = await Borrow.findOne({ book, borrowUser });
    //检查借阅是否已存在
    if (oldBorrow) {
        return res.status(500).json({ message: '该借阅已存在', code: 500 });
    }
    else {
        const borrowModel = new Borrow({ ...req.body });
        borrowModel.save();
    }
    return res.json({ success: true, code: 200 });
});
//借阅删除 borrow/1’
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Borrow.findByIdAndDelete(id).populate(['borrowUser', 'book']);
    return res.status(200).json({ success: true });
});
//借阅详情获取
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const borrow = await Borrow.findById(id).populate(['borrowUser', 'book']);
    if (borrow) {
        return res.json({ data: borrow, success: true });
    }
    else {
        return res.status(200).json({ message: '借阅不存在', code: 500 });
    }
});
//借阅更新
router.put('/:id', async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    await Borrow.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: true });
});
export default router;
//# sourceMappingURL=borrow.js.map