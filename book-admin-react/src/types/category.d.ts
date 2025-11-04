export interface CategoryQueryType {
    name?: string;
    level?: number;
    current?: number;
    pageSize?: number;
    all?: boolean;
}

//分类添加属性
export interface CategoryType {
    name?: string;
    level: 1|2;
    parent: CategoryType;
    _id?: string;
}