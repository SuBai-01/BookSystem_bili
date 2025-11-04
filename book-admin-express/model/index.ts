// import userSchema = require("./userModel");
import userSchema from "./userModel.js";  // ES Module 正确导入方式
import bookSchema from "./bookModel.js";
import borrowSchema from "./borrowModel.js";

import mongoose from "mongoose";
import categorySchema from "./categoryModel.js";

const url = "mongodb+srv://root:root@cluster0.yjglp87.mongodb.net/";

async function main() {
  await mongoose.connect(url);
  console.log("✅ MongoDB Connected");
}

main().catch((err) => console.error("❌ MongoDB Error:", err));

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Borrow = mongoose.model('Borrow', borrowSchema);
const Category = mongoose.model('Category', categorySchema);

export { User, Book, Category, Borrow };