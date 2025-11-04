import mongoose from 'mongoose';
declare const bookSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    author: string;
    stock: number;
    publishAt: string;
    createdAt: number;
    updatedAt: number;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
    description?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    author: string;
    stock: number;
    publishAt: string;
    createdAt: number;
    updatedAt: number;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
    description?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    author: string;
    stock: number;
    publishAt: string;
    createdAt: number;
    updatedAt: number;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
    description?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default bookSchema;
//# sourceMappingURL=bookModel%20copy.d.ts.map