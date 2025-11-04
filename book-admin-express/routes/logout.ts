import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

// 登出接口  是get请求，因为前端调用时没有传参
router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ success: true, message: "登出成功" });
});

export default router;
