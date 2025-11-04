import mongoose from "mongoose";
declare const User: mongoose.Model<{
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    status?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    status?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    status?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    status?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    status?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    status?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
declare const Book: mongoose.Model<{
    name: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    stock: number;
    publishAt: string;
    description?: string | null;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    stock: number;
    publishAt: string;
    description?: string | null;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    stock: number;
    publishAt: string;
    description?: string | null;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    stock: number;
    publishAt: string;
    description?: string | null;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    stock: number;
    publishAt: string;
    description?: string | null;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    createdAt: number;
    updatedAt: number;
    author: string;
    stock: number;
    publishAt: string;
    description?: string | null;
    cover?: string | null;
    category?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
declare const Borrow: mongoose.Model<{
    book: mongoose.Types.ObjectId;
    borrowUser: mongoose.Types.ObjectId;
    borrowAt: number;
    backAt: number;
    status?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    book: mongoose.Types.ObjectId;
    borrowUser: mongoose.Types.ObjectId;
    borrowAt: number;
    backAt: number;
    status?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    book: mongoose.Types.ObjectId;
    borrowUser: mongoose.Types.ObjectId;
    borrowAt: number;
    backAt: number;
    status?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    book: mongoose.Types.ObjectId;
    borrowUser: mongoose.Types.ObjectId;
    borrowAt: number;
    backAt: number;
    status?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    book: mongoose.Types.ObjectId;
    borrowUser: mongoose.Types.ObjectId;
    borrowAt: number;
    backAt: number;
    status?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    book: mongoose.Types.ObjectId;
    borrowUser: mongoose.Types.ObjectId;
    borrowAt: number;
    backAt: number;
    status?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
declare const Category: mongoose.Model<{
    name: string;
    createdAt: number;
    updatedAt: number;
    level: number;
    parent?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    createdAt: number;
    updatedAt: number;
    level: number;
    parent?: mongoose.Types.ObjectId | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    createdAt: number;
    updatedAt: number;
    level: number;
    parent?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    createdAt: number;
    updatedAt: number;
    level: number;
    parent?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    createdAt: number;
    updatedAt: number;
    level: number;
    parent?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    createdAt: number;
    updatedAt: number;
    level: number;
    parent?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { User, Book, Category, Borrow };
//# sourceMappingURL=index.d.ts.map