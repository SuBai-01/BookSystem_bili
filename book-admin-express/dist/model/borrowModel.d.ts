import mongoose from 'mongoose';
declare const borrowSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
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
}>;
export default borrowSchema;
//# sourceMappingURL=borrowModel.d.ts.map