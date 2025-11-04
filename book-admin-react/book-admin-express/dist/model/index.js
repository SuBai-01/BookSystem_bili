"use strict";
// import mongoose from "mongoose";
// import * as console from "node:console";
// var url="mongodb+srv://root:root@cluster0.yjglp87.mongodb.net/"
//
// async function main() {
//     mongoose.connect(url);
// }
//
// main().then(() => {
//     console.log('MongoDB Connected');
// }).catch((err) => {
//     console.log(err);
// })
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const url = "mongodb+srv://root:root@cluster0.yjglp87.mongodb.net/";
async function main() {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected");
}
main().catch((err) => console.error("❌ MongoDB Error:", err));
//# sourceMappingURL=index.js.map