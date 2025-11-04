import mongoose from 'mongoose';
declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
    status?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
    status?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: number;
    updatedAt: number;
    name?: string | null;
    nickName?: string | null;
    password?: string | null;
    sex?: string | null;
    role?: string | null;
    status?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default userSchema;
//# sourceMappingURL=userModel.d.ts.map