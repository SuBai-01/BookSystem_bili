import express from 'express';
import { Category } from '../model/index.js';
const router = express.Router();
//得同时运行 npm run dev  and  npm run run 才行，前者编译成ts，后者运行node
//分类获取
router.get('/', async (req, res) => {
    const { current = 1, pageSize = 20, name, level } = req.query;
    const filter = {
        ...(name && { name }),
        ...(level && { level }),
    };
    const data = await Category.find(filter)
        .skip((Number(current) - 1) * Number(pageSize))
        .populate('parent')
        .limit(Number(pageSize));
    const total = await Category.countDocuments(filter);
    console.log(total);
    return res.status(200).json({ data, total });
});
//分类新建
router.post('/', async (req, res) => {
    const { name } = req.body;
    const oldCategory = await Category.findOne({ name });
    //检查分类是否已存在
    if (oldCategory) {
        return res.status(500).json({ message: '该分类已存在', code: 500 });
    }
    else {
        const categoryModel = new Category({ ...req.body });
        categoryModel.save();
        return res.json({ success: true, code: 200 });
    }
});
//分类删除 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
});
//分类编辑
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (category) {
        return res.json({ data: category, success: true });
    }
    else {
        return res.status(200).json({ message: '该分类不存在', code: 500 });
    }
});
//图书更新
router.put('/:id', async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    await Category.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: true });
});
export default router;
//# sourceMappingURL=category.js.map