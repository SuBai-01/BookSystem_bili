import mongoose from 'mongoose';
declare const categorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    level: number;
    createdAt: number;
    updatedAt: number;
    parent?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    level: number;
    createdAt: number;
    updatedAt: number;
    parent?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    level: number;
    createdAt: number;
    updatedAt: number;
    parent?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default categorySchema;
//# sourceMappingURL=categoryModel.d.ts.map