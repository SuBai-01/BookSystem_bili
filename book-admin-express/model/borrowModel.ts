import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 改成 ObjectId 并引用 User
  status: { type: String},  //参考level
  borrowAt: { type: Number, default: Date.now },
  backAt: { type: Number, default: Date.now },
});

export default borrowSchema;