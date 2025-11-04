import express from 'express';
import { Book } from '../model/index.js';
const router = express.Router();
//得同时运行 npm run dev  and  npm run run 才行，前者编译成ts，后者运行node
//图书列表获取
router.get('/', async (req, res) => {
    const { current = 1, pageSize = 20, name, author, category } = req.query;
    const filter = {
        ...(name && { name }),
        ...(author && { author }),
        ...(category && { category }),
    };
    const data = await Book.find(filter)
        .skip((Number(current) - 1) * Number(pageSize))
        .populate('category')
        .limit(Number(pageSize));
    const total = await Book.countDocuments(filter);
    console.log(total);
    return res.status(200).json({ data, total });
});
//图书新建
router.post('/', (req, res) => {
    const body = req.body;
    const bookModel = new Book({ ...body });
    bookModel.save();
    return res.json({ success: true, code: 200 });
});
//图书删除 ‘book/1’
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id).populate('category');
    return res.status(200).json({ success: true });
});
//图书详情获取
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate('category');
    if (book) {
        return res.json({ data: book, success: true });
    }
    else {
        return res.status(200).json({ message: '图书不存在', code: 500 });
    }
});
//图书更新
router.put('/:id', async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    await Book.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: true });
});
export default router;
//# sourceMappingURL=book%20copy.js.map